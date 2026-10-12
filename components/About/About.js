import { siteConfig as defaults } from "@/siteConfig";
import { getSiteConfig } from "@/lib/siteConfigStore";
import googleReviews from "@/data/google-reviews.json";
import styles from "./About.module.css";

export default async function About() {
  const siteConfig = await getSiteConfig();
  const { about } = siteConfig;
  return (
    <section className={`${styles.section} section`} id="about">
      <div className="shell">
        <div className={styles.grid}>
          {/* Text */}
          <div className={styles.body}>
            <span className="eyebrow">About the park</span>
            <h2 className={`section-title ${styles.title}`}>{about.title}</h2>
            {about.paragraphs.map((p, i) => (
              <p key={i} className={styles.para}>{p}</p>
            ))}

            {/* Highlights */}
            <div className={styles.highlights}>
              <div className={styles.hlCard}>
                <span className={styles.hlNum}>20+</span>
                <span className={styles.hlLabel}>Thrilling Rides</span>
              </div>
              <div className={styles.hlCard}>
                <span className={styles.hlNum}>1</span>
                <span className={styles.hlLabel}>Giant Wave Pool</span>
              </div>
              <div className={`${styles.hlCard} ${styles.accent}`}>
                <span className={styles.hlNum}>2</span>
                <span className={styles.hlLabel}>Daily Shifts</span>
              </div>
              <div className={styles.hlCard}>
                <span className={styles.hlNum}>{googleReviews.rating ? `${googleReviews.rating.toFixed(1)}★` : "★"}</span>
                <span className={styles.hlLabel}>Google Rating</span>
              </div>
            </div>
          </div>

          {/* Video / reel placeholder */}
          <div className={styles.reelWrap}>
            <div className={styles.reelFrame}>
              <video
                src={defaults.reelVideo}
                autoPlay
                poster="/waterparkvideo-poster.webp"
                muted
                loop
                playsInline
                className={styles.reelVideo}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
