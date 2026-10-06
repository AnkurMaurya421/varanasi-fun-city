import Link from "next/link";
import { services } from "@/servicesConfig";
import styles from "./Occasions.module.css";

const weddingSlugs = ["wedding-lawn-varanasi", "reception-venue-varanasi", "engagement-venue-varanasi"];
const eventPartySlugs = ["event-venue-varanasi", "corporate-events-varanasi", "party-venue-varanasi", "birthday-party-varanasi", "kitty-party-varanasi", "pool-party-varanasi"];

function byslug(slugs) {
  return slugs.map((slug) => services.find((s) => s.slug === slug)).filter(Boolean);
}

export default function Occasions() {
  return (
    <section className={`${styles.section} section alt`} id="occasions">
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow">Beyond the water park</span>
          <h2 className="section-title">Weddings, Events &amp; Parties</h2>
          <p className="section-sub">
            Varanasi Fun City&apos;s open lawn and air-conditioned hall host weddings, receptions,
            engagements, corporate events and family parties — with catering, decoration and parking arranged on-site.
          </p>
        </div>

        <div className={styles.group}>
          <h3 className={styles.groupTitle}>Weddings &amp; Celebrations</h3>
          <div className={styles.grid}>
            {byslug(weddingSlugs).map((s) => (
              <Link key={s.slug} href={`/${s.slug}/`} className={styles.card}>
                <span className={styles.cardTitle}>{s.h1}</span>
                <span className={styles.cardArrow}>→</span>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.group}>
          <h3 className={styles.groupTitle}>Events &amp; Parties</h3>
          <div className={styles.grid}>
            {byslug(eventPartySlugs).map((s) => (
              <Link key={s.slug} href={`/${s.slug}/`} className={styles.card}>
                <span className={styles.cardTitle}>{s.h1}</span>
                <span className={styles.cardArrow}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
