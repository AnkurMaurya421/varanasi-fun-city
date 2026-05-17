"use client";
import { siteConfig } from "@/siteConfig";
import styles from "./Hero.module.css";
import { useState, useEffect } from "react";

export default function Hero() {
  const { name, subTagline, heroImage, isOpen, openingDate, announcements } = siteConfig;
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (announcements.length < 2) return;
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % announcements.length);
        setAnimating(false);
      }, 300);
    }, 4000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const current = announcements[index];

  return (
    <section className={styles.hero} id="hero">
      {/* Decorative blobs */}
      <div className={styles.blobTl} aria-hidden="true" />
      <div className={styles.blobBr} aria-hidden="true" />

      <div className={`${styles.content} shell`}>
        <div className={styles.grid}>

          {/* Left — copy */}
          <div className={styles.copy}>

            {/* Announce pill */}
            <div className={styles.announce}>
              <span className={styles.announceDot} aria-hidden="true" />
              <span className={styles.announceLabel}>{current.label}</span>
              <span className={`${styles.announceText} ${animating ? styles.announceOut : ""}`}>
                {current.text}
              </span>
            </div>

            <h1 className={styles.title}>
              Dive Into Fun at{" "}
              <span className={styles.titleAccent}>{name}</span>
            </h1>

            <p className={styles.sub}>{subTagline}</p>

            <div className={styles.actions}>
              <a href="#pricing" className={styles.ctaPrimary}>
                🎟️ Check Tickets
              </a>
              <a href="#rides" className={styles.ctaSecondary}>
                Explore Rides ↓
              </a>
            </div>

            {/* Stats */}
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>20+</span>
                <span className={styles.statLabel}>Rides</span>
              </div>
              <div className={styles.statDivider} aria-hidden="true" />
              <div className={styles.stat}>
                <span className={styles.statNum}>1</span>
                <span className={styles.statLabel}>Wave Pool</span>
              </div>
              <div className={styles.statDivider} aria-hidden="true" />
              <div className={styles.stat}>
                <span className={styles.statNum}>2</span>
                <span className={styles.statLabel}>Shifts Daily</span>
              </div>
              <div className={styles.statDivider} aria-hidden="true" />
              <div className={styles.stat}>
                <span className={styles.statNum}>∞</span>
                <span className={styles.statLabel}>Memories</span>
              </div>
            </div>
          </div>

          {/* Right — image card */}
          <div className={styles.imageWrap}>
            <div className={styles.imageCard}>
              {heroImage && !heroImage.startsWith("// TODO") ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={heroImage} alt="Varanasi Fun City waterpark" />
              ) : (
                <div style={{
                  width: "100%", height: "100%", minHeight: "300px",
                  background: "linear-gradient(135deg, #bae6fd, #7dd3fc)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexDirection: "column", gap: "8px"
                }}>
                  <span style={{ fontSize: "3rem", opacity: 0.4 }}>🌊</span>
                  <span style={{ fontSize: "0.75rem", color: "#0369a1", opacity: 0.6, fontWeight: 600 }}>
                    TODO: Add heroImage in siteConfig.js
                  </span>
                </div>
              )}
            </div>
            {/* Floating droplets */}
            <span className={`${styles.droplet} ${styles.d1}`} aria-hidden="true" />
            <span className={`${styles.droplet} ${styles.d2}`} aria-hidden="true" />
            <span className={`${styles.droplet} ${styles.d3}`} aria-hidden="true" />
            <span className={`${styles.droplet} ${styles.d4}`} aria-hidden="true" />
            <span className={`${styles.droplet} ${styles.d5}`} aria-hidden="true" />
          </div>

        </div>
      </div>
    </section>
  );
}
