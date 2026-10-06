import { siteConfig } from "@/siteConfig";
import { services } from "@/servicesConfig";
import "./globals.css";

export const metadata = {
  title: {
    default: siteConfig.seo.title,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: "Ankur Maurya" }],
  creator: "Ankur Maurya",
  metadataBase: new URL(siteConfig.seo.canonicalUrl),
  alternates: {
    canonical: siteConfig.seo.canonicalUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.seo.canonicalUrl,
    siteName: siteConfig.name,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Waterpark in Varanasi`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  themeColor: siteConfig.seo.themeColor,
};

// JSON-LD Local Business Schema
function JsonLd() {
  const eventServices = services.filter((s) => s.category !== "park");

  const schema = {
    "@context": "https://schema.org",
    "@type": [siteConfig.schema.type, "EventVenue"],
    name: siteConfig.name,
    description: siteConfig.seo.description,
    url: siteConfig.seo.canonicalUrl,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sona Talab, Pandeypur Panchkoshi Road",
      addressLocality: "Varanasi",
      addressRegion: "Uttar Pradesh",
      postalCode: "221007",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.schema.latitude,
      longitude: siteConfig.schema.longitude,
    },
    areaServed: [
      { "@type": "City", name: "Varanasi" },
      { "@type": "Place", name: "Pandeypur, Varanasi" },
      { "@type": "Place", name: "Ashapur, Varanasi" },
      { "@type": "Place", name: "Pahariya, Varanasi" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
        ],
        opens: "11:00",
        closes: "17:00",
      },
    ],
    priceRange: siteConfig.schema.priceRange,
    currenciesAccepted: siteConfig.schema.currenciesAccepted,
    paymentAccepted: siteConfig.schema.paymentAccepted,
    image: `${siteConfig.seo.canonicalUrl}${siteConfig.seo.ogImage}`,
    offers: {
      "@type": "Offer",
      price: "400",
      priceCurrency: "INR",
      description: "General admission ticket",
    },
    makesOffer: eventServices.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.h1,
        serviceType: s.keyword,
        url: `${siteConfig.seo.canonicalUrl}/${s.slug}/`,
      },
    })),
    sameAs: [
      siteConfig.socials.facebook,
      siteConfig.socials.instagram,
      siteConfig.socials.youtube,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
