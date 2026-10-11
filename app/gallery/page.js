import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Chatbot from "@/components/Chatbot/Chatbot";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { siteConfig } from "@/siteConfig";
import googleMedia from "@/data/google-media.json";
import styles from "./gallery.module.css";

const BASE_URL = siteConfig.seo.canonicalUrl;

export const metadata = {
  title: "Photo Gallery",
  description:
    "Browse photos of Varanasi Fun City's wave pool, slides, rain dance, kids' zone, wedding lawn and banquet halls in Varanasi.",
  alternates: { canonical: `${BASE_URL}/gallery/` },
};

// Only categories with real, verified photographs are listed here.
const photoCategories = [
  {
    id: "wave-pool",
    label: "Wave Pool",
    images: ["/wavepool1.jpg", "/wavepool2.jpg", "/wavepool3.jpg", "/wavepool4.jpg"],
  },
  {
    id: "slides",
    label: "Slides & Big Rides",
    images: ["/bigrides1.jpg", "/bigrides2.jpg", "/bigrides3.jpg", "/bigrides4.jpg", "/waterrides1.jpg", "/waterrides2.jpg"],
  },
  {
    id: "rain-dance",
    label: "Rain Dance",
    images: ["/raindance1.jpg", "/raindance2.jpg"],
  },
  {
    id: "kids-zone",
    label: "Kids' Zone",
    images: ["/kidsplay1.jpg", "/kidsplay2.jpg", "/kidsplay3.jpg", "/kidsplay4.jpg", "/kidsplay5.jpg", "/childpool1.jpg", "/childpool2.jpg", "/childpool3.jpg"],
  },
  {
    id: "night-shift",
    label: "Night Shift",
    images: ["/night1.jpg", "/night2.jpg", "/night3.jpg"],
  },
  {
    id: "weddings-halls",
    label: "Weddings & Banquet Halls",
    images: [
      "/varanasi-fun-city-wedding-stage.jpg",
      "/varanasi-fun-city-banquet-hall.jpg",
      "/varanasi-fun-city-wedding-entrance.jpg",
      "/varanasi-fun-city-wedding-event.jpg",
      "/varanasi-fun-city-ac-room.jpg",
    ],
  },
];

// Real photos for these specific event types haven't been supplied yet —
// shown as a pending category instead of relabeling wedding/hall photos.
const pendingCategories = [
  "Birthday & Kitty Parties",
  "Corporate Events & Seminars",
];

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="shell">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Gallery", href: "/gallery/" }]} />
        </div>

        <section className="section">
          <div className="shell">
            <div className="section-head">
              <span className="eyebrow">Gallery</span>
              <h1 className="section-title">Photo Gallery</h1>
              <p className="section-sub">
                A look at the wave pool, slides, rain dance, kids&apos; zone, wedding lawn and banquet halls at Varanasi Fun City.
              </p>
            </div>

            {photoCategories.map((cat) => (
              <div key={cat.id} className={styles.category}>
                <h2 className={styles.categoryTitle}>{cat.label}</h2>
                <div className={styles.grid}>
                  {cat.images.map((src) => (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img key={src} src={src} alt={`${cat.label} at Varanasi Fun City`} loading="lazy" className={styles.photo} />
                  ))}
                </div>
              </div>
            ))}

            {googleMedia.items.length > 0 && (
              <div className={styles.category}>
                <h2 className={styles.categoryTitle}>Latest from our Google profile</h2>
                <div className={styles.grid}>
                  {googleMedia.items.map((m) => {
                    const alt = `${m.label} at Varanasi Fun City`;
                    const img = (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={m.file} alt={alt} loading="lazy" className={styles.photo} />
                        {m.video && <span className={styles.play} aria-hidden="true">▶</span>}
                      </>
                    );
                    return (
                      <figure key={m.id} className={styles.gfig}>
                        {m.video ? (
                          <a href={siteConfig.contact.mapUrl} target="_blank" rel="noopener noreferrer" aria-label={`${alt} (video, watch on Google)`}>
                            {img}
                          </a>
                        ) : img}
                        {m.credit && <figcaption className={styles.credit}>Photo: {m.credit}</figcaption>}
                      </figure>
                    );
                  })}
                </div>
                <p className={styles.moreLink}>
                  <a href={siteConfig.contact.mapUrl} target="_blank" rel="noopener noreferrer">See more photos and videos on Google →</a>
                </p>
              </div>
            )}

            <div className={styles.category}>
              <h2 className={styles.categoryTitle}>Weddings, Events &amp; Parties</h2>
              <div className={styles.pendingRow}>
                {pendingCategories.map((label) => (
                  <div key={label} className={styles.pendingCard}>
                    <span className={styles.pendingIcon}>📷</span>
                    <span>{label}</span>
                    <span className={styles.pendingNote}>Photos coming soon</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
