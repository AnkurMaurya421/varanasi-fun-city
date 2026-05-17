import { siteConfig } from "@/siteConfig";
import styles from "./About.module.css";

export default function About() {
  return (
    <section className={`${styles.section} section`} id="about">
      <div className="shell">
        <div className={styles.grid}>
          {/* Text */}
          <div className={styles.body}>
            <span className="eyebrow">About the park</span>
            <h2 className={`section-title ${styles.title}`}>
              North India's coolest waterpark splash
            </h2>
            <p className={styles.para}>
              Varanasi Fun City is an excellent water recreation paradise appealing to people
              of all age groups. Situated at the center of Varanasi on Pandeypur-Panchkosi Road
              in the heart of Kashi.
            </p>
            <p className={styles.para}>
              Decorated by mermaids and built extensively with fibreglass, it is a rare combination
              of modern technology and tradition — making it a place for exhilarating thrills and fun.
              The water rides are not just dumped here; each has been designed to deliver a unique
              thrill and challenge.
            </p>

            {/* Highlights */}
            <div className={styles.highlights}>
              <div className={styles.hlCard}>
                <span className={styles.hlNum}>15+</span>
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
                <span className={styles.hlNum}>5★</span>
                <span className={styles.hlLabel}>Family Rated</span>
              </div>
            </div>
          </div>

          {/* Video / reel placeholder */}
          <div className={styles.reelWrap}>
            <div className={styles.reelFrame}>
              <video
                src={siteConfig.reelVideo}
                autoPlay
                muted
                loop
                playsInline
                className={styles.reelVideo}
              />
              <div className={styles.reelPlaceholder}>
                <span className={styles.playIcon}>▶</span>
                <p className={styles.reelNote}>
                  TODO: Add YouTube embed or reel video here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
