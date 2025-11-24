import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Dynamic rendering enabled for API routes (newsletter subscription)
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
