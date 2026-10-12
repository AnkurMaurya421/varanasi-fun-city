"use client";

import { useState, useEffect } from "react";
import { useSiteConfig } from "@/components/ConfigProvider/ConfigProvider";
import styles from "./AnnouncementBar.module.css";

export default function AnnouncementBar() {
  const siteConfig = useSiteConfig();
  const announcements = siteConfig.announcements;
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

  const raw = announcements[index];
  const current = raw && { ...raw, text: raw.text.replaceAll("{reopening}", siteConfig.reopeningText) };
  if (!current) return null;

  return (
    <div className={`${styles.bar} ${styles[current.status]}`} role="status" aria-live="polite">
      <div className={styles.inner}>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.label}>{current.label}</span>
        <span className={`${styles.text} ${animating ? styles.out : styles.in}`}>
          {current.text}
        </span>
      </div>
    </div>
  );
}
