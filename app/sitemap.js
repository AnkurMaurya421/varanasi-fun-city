import { siteConfig } from "@/siteConfig";
import { services } from "@/servicesConfig";

export default function sitemap() {
  const base = siteConfig.seo.canonicalUrl;
  const lastModified = new Date();

  const staticRoutes = [
    { url: `${base}/`, priority: 1 },
    { url: `${base}/gallery/`, priority: 0.6 },
    { url: `${base}/contact/`, priority: 0.6 },
  ];

  const serviceRoutes = services.map((s) => ({
    url: `${base}/${s.slug}/`,
    priority: s.category === "park" ? 0.9 : 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes].map((route) => ({
    ...route,
    lastModified,
    changeFrequency: "weekly",
  }));
}
