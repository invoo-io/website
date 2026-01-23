import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

// Check if we're building for static export (e.g., GoDaddy) or Vercel
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  // Only use static export if explicitly requested (for GoDaddy deployment)
  ...(isStaticExport && { output: "export" }),
  trailingSlash: true,
  images: {
    unoptimized: isStaticExport, // Only unoptimized for static export
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
      "embla-carousel-react",
    ],
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },
};

export default withNextIntl(nextConfig);
