import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import validator from "validator";

// Environment variables are validated at runtime, not build time
// This allows the build to succeed on Vercel before env vars are configured
function getEnvVars() {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const BLOG_AUDIENCE_ID = process.env.RESEND_BLOG_AUDIENCE_ID;

  if (!RESEND_API_KEY || !BLOG_AUDIENCE_ID) {
    return null;
  }

  return { RESEND_API_KEY, BLOG_AUDIENCE_ID };
}

// Disposable email domains blocklist
// Common throwaway email services to prevent spam
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "10minutemail.com",
  "guerrillamail.com",
  "mailinator.com",
  "tempmail.com",
  "throwaway.email",
  "yopmail.com",
  "sjkrfsfh.com",
  "temp-mail.org",
  "fakeinbox.com",
  "getnada.com",
  "trashmail.com",
  "maildrop.cc",
  "sharklasers.com",
  "guerrillamail.info",
  "grr.la",
  "guerrillamail.biz",
  "guerrillamail.de",
  "guerrillamail.net",
  "spam4.me",
  "mailnesia.com",
  "trbvm.com",
]);

// Rate limiting (in-memory store)
// NOTE: For single-server deployments, this in-memory implementation works perfectly
// For multi-instance/load-balanced deployments, consider using Redis or a database
const rateLimitMap = new Map<string, { count: number; resetTime: number; violations: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 2; // 2 requests per minute (stricter)

function cleanupRateLimits() {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}

function checkRateLimit(identifier: string): boolean {
  cleanupRateLimits(); // Clean up expired entries on each request

  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
      violations: record?.violations || 0, // Preserve violation count
    });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    // Increment violations for exponential backoff
    record.violations++;
    // Exponential backoff: double the window for each violation (max 1 hour)
    const backoffMultiplier = Math.min(Math.pow(2, record.violations), 60);
    record.resetTime = now + RATE_LIMIT_WINDOW * backoffMultiplier;
    return false;
  }

  record.count++;
  return true;
}

function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  return domain ? DISPOSABLE_EMAIL_DOMAINS.has(domain) : false;
}

// CORS configuration
const allowedOrigins = [
  "https://invoo.es",
  "https://www.invoo.es",
  "http://localhost:4200",
  "http://localhost:3000",
];

// Check if origin matches Vercel preview URLs (*.vercel.app)
function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  if (allowedOrigins.includes(origin)) return true;
  // Allow Vercel preview deployments
  if (origin.endsWith(".vercel.app")) return true;
  return false;
}

function getCorsHeaders(origin: string | null): Record<string, string> {
  if (origin && isAllowedOrigin(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    };
  }
  return {
    "Access-Control-Allow-Origin": "*",
  };
}

// Handle OPTIONS preflight request
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (isAllowedOrigin(origin)) {
    return new NextResponse(null, {
      status: 204,
      headers: getCorsHeaders(origin),
    });
  }

  return new NextResponse(null, { status: 403 });
}

export async function POST(request: NextRequest) {
  try {
    // 0. Validate environment variables at runtime
    const envVars = getEnvVars();
    if (!envVars) {
      console.error("Newsletter API: Missing RESEND_API_KEY or RESEND_BLOG_AUDIENCE_ID");
      return NextResponse.json(
        { error: "Service temporarily unavailable" },
        { status: 503 }
      );
    }

    const resend = new Resend(envVars.RESEND_API_KEY);

    // 1. Verify origin for CSRF protection
    const origin = request.headers.get("origin");

    if (origin && !isAllowedOrigin(origin)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const corsHeaders = getCorsHeaders(origin);

    // 2. Get IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") ??
               request.headers.get("x-real-ip") ??
               "127.0.0.1";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: corsHeaders }
      );
    }

    // 3. Parse and validate request body
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        { error: "Content-Type must be application/json" },
        { status: 400, headers: corsHeaders }
      );
    }

    const body = await request.json();
    const { email } = body;

    // 4. Validate email exists
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    // 5. Sanitize and normalize email
    const sanitizedEmail = email.trim().toLowerCase();

    // 6. Validate email format (strong validation)
    if (!validator.isEmail(sanitizedEmail, {
      allow_utf8_local_part: false,
      require_tld: true,
    })) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400, headers: corsHeaders }
      );
    }

    // 7. Block disposable email addresses
    if (isDisposableEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Disposable email addresses are not allowed" },
        { status: 400, headers: corsHeaders }
      );
    }

    // 8. Check length constraints (RFC 5321)
    const [localPart, domain] = sanitizedEmail.split("@");
    if (
      localPart.length > 64 ||
      domain.length > 255 ||
      sanitizedEmail.length > 320
    ) {
      return NextResponse.json(
        { error: "Email address is too long" },
        { status: 400, headers: corsHeaders }
      );
    }

    // 9. Additional validation checks
    if (sanitizedEmail.includes("..")) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400, headers: corsHeaders }
      );
    }

    // 10. Add contact to Resend audience
    try {
      const response = await resend.contacts.create({
        email: sanitizedEmail,
        audienceId: envVars.BLOG_AUDIENCE_ID,
      });

      // Check if the response indicates success
      if (response.error) {
        // Handle specific Resend errors
        if (response.error.message?.includes("already exists")) {
          return NextResponse.json(
            { error: "This email is already subscribed" },
            { status: 409, headers: corsHeaders }
          );
        }

        console.error("Resend API error:", response.error);
        return NextResponse.json(
          { error: "Failed to subscribe. Please try again." },
          { status: 500, headers: corsHeaders }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "Successfully subscribed to newsletter",
        },
        { status: 200, headers: corsHeaders }
      );
    } catch (resendError: unknown) {
      console.error("Resend error:", resendError);

      // Handle specific error cases with type guard
      if (
        resendError &&
        typeof resendError === "object" &&
        "message" in resendError &&
        typeof resendError.message === "string" &&
        resendError.message.includes("already exists")
      ) {
        return NextResponse.json(
          { error: "This email is already subscribed" },
          { status: 409, headers: corsHeaders }
        );
      }

      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: 500, headers: corsHeaders }
      );
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    const origin = request.headers.get("origin");
    const corsHeaders = getCorsHeaders(origin);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
