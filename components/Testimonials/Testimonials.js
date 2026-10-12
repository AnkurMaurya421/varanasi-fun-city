import googleReviews from "@/data/google-reviews.json";
import { getSiteConfig } from "@/lib/siteConfigStore";
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

const initials = (name) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");

const monthYear = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", { month: "short", year: "numeric" });

export default async function Testimonials() {
  const siteConfig = await getSiteConfig();
  const { reviews, rating, total } = googleReviews;
  const reviewsUrl = siteConfig.contact.mapUrl;
  if (!reviews || reviews.length === 0) return null;

  return (
    <section className={`${styles.section} section alt`} id="testimonials">
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow">Happy splashers</span>
          <h2 className="section-title">What guests say on Google</h2>
          {rating && total && (
            <p className="section-sub">
              {rating.toFixed(1)} ★ average from {total.toLocaleString("en-IN")} Google reviews
            </p>
          )}
        </div>

        <div className={styles.track}>
          {reviews.map((r) => (
            <article key={r.id} className={styles.card}>
              <span className={styles.quoteMark} aria-hidden="true">&quot;</span>
              <Stars count={r.stars} />
              <p className={styles.text}>{r.text}</p>
              <div className={styles.person}>
                <div className={styles.avatar} aria-hidden="true">{initials(r.name)}</div>
                <div>
                  <div className={styles.name}>{r.name}</div>
                  <div className={styles.loc}>Google review · {monthYear(r.date)}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {reviewsUrl && (
          <p className={styles.more}>
            <a href={reviewsUrl} target="_blank" rel="noopener noreferrer">See all reviews on Google →</a>
          </p>
        )}
      </div>
    </section>
  );
}
