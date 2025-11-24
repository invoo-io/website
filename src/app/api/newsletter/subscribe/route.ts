import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import validator from "validator";

// Validate environment variables at module load
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const BLOG_AUDIENCE_ID = process.env.RESEND_BLOG_AUDIENCE_ID;

if (!RESEND_API_KEY) {
  throw new Error(
    "RESEND_API_KEY is not configured. Please add it to your environment variables."
  );
}

if (!BLOG_AUDIENCE_ID) {
  throw new Error(
    "RESEND_BLOG_AUDIENCE_ID is not configured. Please add it to your environment variables."
  );
}

// Initialize Resend
const resend = new Resend(RESEND_API_KEY);

// Rate limiting (in-memory store)
// NOTE: For production with multiple serverless instances, use Vercel KV, Upstash Redis, or similar
// This simple implementation works for single-instance dev and low-traffic production
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3; // 3 requests per minute

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
    });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // 1. Verify origin for CSRF protection
    const origin = request.headers.get("origin");
    const allowedOrigins = [
      "https://invoo.es",
      "https://www.invoo.es",
      "http://localhost:4200",
      "http://localhost:3000",
    ];

    if (origin && !allowedOrigins.includes(origin)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 2. Get IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") ??
               request.headers.get("x-real-ip") ??
               "127.0.0.1";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // 3. Parse and validate request body
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        { error: "Content-Type must be application/json" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { email } = body;

    // 4. Validate email exists
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
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
        { status: 400 }
      );
    }

    // 7. Check length constraints (RFC 5321)
    const [localPart, domain] = sanitizedEmail.split("@");
    if (
      localPart.length > 64 ||
      domain.length > 255 ||
      sanitizedEmail.length > 320
    ) {
      return NextResponse.json(
        { error: "Email address is too long" },
        { status: 400 }
      );
    }

    // 8. Additional validation checks
    if (sanitizedEmail.includes("..")) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // 9. Add contact to Resend audience
    try {
      const response = await resend.contacts.create({
        email: sanitizedEmail,
        audienceId: BLOG_AUDIENCE_ID,
      });

      // Check if the response indicates success
      if (response.error) {
        // Handle specific Resend errors
        if (response.error.message?.includes("already exists")) {
          return NextResponse.json(
            { error: "This email is already subscribed" },
            { status: 409 }
          );
        }

        console.error("Resend API error:", response.error);
        return NextResponse.json(
          { error: "Failed to subscribe. Please try again." },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "Successfully subscribed to newsletter",
        },
        { status: 200 }
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
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
