import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Chatbot from "@/components/Chatbot/Chatbot";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { siteConfig } from "@/siteConfig";
import VideoTile from "@/components/VideoTile/VideoTile";
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
    images: ["/wavepool1.webp", "/wavepool2.webp", "/wavepool3.webp", "/wavepool4.webp"],
  },
  {
    id: "slides",
    label: "Slides & Big Rides",
    images: ["/bigrides1.webp", "/bigrides2.webp", "/bigrides3.webp", "/bigrides4.webp", "/waterrides1.webp", "/waterrides2.webp"],
  },
  {
    id: "rain-dance",
    label: "Rain Dance",
    images: ["/raindance1.webp", "/raindance2.webp"],
  },
  {
    id: "kids-zone",
    label: "Kids' Zone",
    images: ["/kidsplay1.webp", "/kidsplay2.webp", "/kidsplay3.webp", "/kidsplay4.webp", "/kidsplay5.webp", "/childpool1.webp", "/childpool2.webp", "/childpool3.webp"],
  },
  {
    id: "night-shift",
    label: "Night Shift",
    images: ["/night1.webp", "/night2.webp", "/night3.webp"],
  },
  {
    id: "weddings-halls",
    label: "Weddings & Banquet Halls",
    images: [
      "/varanasi-fun-city-wedding-stage.webp",
      "/varanasi-fun-city-banquet-hall.webp",
      "/varanasi-fun-city-wedding-entrance.webp",
      "/varanasi-fun-city-wedding-event.webp",
      "/varanasi-fun-city-ac-room.webp",
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

            {googleMedia.items.some((m) => !m.video) && (
              <div className={styles.category}>
                <h2 className={styles.categoryTitle}>Latest from our Google profile</h2>
                <div className={styles.grid}>
                  {googleMedia.items.filter((m) => !m.video).map((m) => (
                    <figure key={m.id} className={styles.gfig}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={m.file} alt="Photo from Varanasi Fun City" loading="lazy" className={styles.photo} />
                      {m.credit && <figcaption className={styles.credit}>Photo: {m.credit}</figcaption>}
                    </figure>
                  ))}
                </div>
              </div>
            )}

            {googleMedia.items.some((m) => m.video) && (
              <div className={styles.category}>
                <h2 className={styles.categoryTitle}>Videos on Google</h2>
                <div className={styles.grid}>
                  {googleMedia.items.filter((m) => m.video).map((m) => (
                    <figure key={m.id} className={styles.gfig}>
                      <VideoTile poster={m.file} src={m.videoFile} fallbackHref={siteConfig.contact.mapUrl} photoClass={styles.photo} playClass={styles.play} />
                      {m.credit && <figcaption className={styles.credit}>Video: {m.credit}</figcaption>}
                    </figure>
                  ))}
                </div>
                <p className={styles.moreLink}>
                  <a href={siteConfig.contact.mapUrl} target="_blank" rel="noopener noreferrer">Watch these and more on Google →</a>
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
