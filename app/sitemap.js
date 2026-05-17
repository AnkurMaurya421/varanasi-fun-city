import { siteConfig } from "@/siteConfig";

export default function sitemap() {
  return [
    {
      url: siteConfig.seo.canonicalUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
