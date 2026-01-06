import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // OpenAI / ChatGPT bots
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      // Anthropic / Claude bots
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      // Google AI / Gemini bots
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "Googlebot-Extended",
        allow: "/",
      },
      // Perplexity AI
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      // Apple / Siri
      {
        userAgent: "Applebot",
        allow: "/",
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
      },
      // Cohere AI
      {
        userAgent: "cohere-ai",
        allow: "/",
      },
      // Meta AI
      {
        userAgent: "FacebookBot",
        allow: "/",
      },
      {
        userAgent: "Meta-ExternalAgent",
        allow: "/",
      },
      // Microsoft / Bing AI
      {
        userAgent: "Bingbot",
        allow: "/",
      },
      // Other AI research crawlers
      {
        userAgent: "CCBot",
        allow: "/",
      },
      {
        userAgent: "YouBot",
        allow: "/",
      },
      // Default rule for all other bots
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/en/blog/"],
      },
    ],
    sitemap: "https://invoo.es/sitemap.xml",
  };
}
