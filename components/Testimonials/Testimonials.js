import { siteConfig } from "@/siteConfig";
import styles from "./Testimonials.module.css";

function Stars({ count }) {
  return (
    <div className={styles.stars} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} aria-hidden="true">★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { testimonials } = siteConfig;

  return (
    <section className={`${styles.section} section alt`} id="testimonials">
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow">Happy splashers</span>
          <h2 className="section-title">What guests are saying</h2>
          <p className="section-sub">Real reviews from real visitors.</p>
        </div>

        <div className={styles.track}>
          {testimonials.map((t) => (
            <article key={t.id} className={styles.card}>
              <span className={styles.quoteMark} aria-hidden="true">"</span>
              <Stars count={t.stars} />
              <p className={styles.text}>{t.text}</p>
              <div className={styles.person}>
                <div className={styles.avatar} aria-hidden="true">{t.initials}</div>
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.loc}>{t.location}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
