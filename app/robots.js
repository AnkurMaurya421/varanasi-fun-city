import { siteConfig } from "@/siteConfig";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${siteConfig.seo.canonicalUrl}/sitemap.xml`,
  };
}
