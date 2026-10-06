import { siteConfig } from "@/siteConfig";

const BASE_URL = siteConfig.seo.canonicalUrl;

export function pageUrl(slug) {
  return `${BASE_URL}/${slug}/`;
}

export function buildServiceMetadata(service) {
  const url = pageUrl(service.slug);
  const image = service.hero?.image || siteConfig.seo.ogImage;

  return {
    title: service.title,
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title: service.title,
      description: service.metaDescription,
      images: [{ url: image, width: 1200, height: 630, alt: service.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.metaDescription,
      images: [image],
    },
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href.startsWith("http") ? item.href : `${BASE_URL}${item.href}`,
    })),
  };
}

export function faqSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.h1,
    serviceType: service.keyword,
    description: service.metaDescription,
    url: pageUrl(service.slug),
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      telephone: siteConfig.contact.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Sona Talab, Pandeypur Panchkoshi Road",
        addressLocality: "Varanasi",
        addressRegion: "Uttar Pradesh",
        postalCode: "221007",
        addressCountry: "IN",
      },
    },
    areaServed: [
      { "@type": "City", name: "Varanasi" },
      { "@type": "Place", name: "Pandeypur, Varanasi" },
      { "@type": "Place", name: "Ashapur, Varanasi" },
      { "@type": "Place", name: "Pahariya, Varanasi" },
    ],
  };
}

export function JsonLdScript({ data }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
