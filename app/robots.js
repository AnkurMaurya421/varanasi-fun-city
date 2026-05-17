import { siteConfig } from "@/siteConfig";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.seo.canonicalUrl}/sitemap.xml`,
  };
}
