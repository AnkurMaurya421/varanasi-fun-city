import { siteConfig } from "@/siteConfig";
import styles from "./Rides.module.css";

const tagColors = {
  Signature: "tagBlue",
  Thrill:    "tagRed",
  Party:     "tagPurple",
  Family:    "tagGreen",
  Chill:     "tagTeal",
  Events:    "tagOrange",
};

export default function Rides() {
  const { rides } = siteConfig;

  return (
    <section className={`${styles.section} section`} id="rides">
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow">Things to do</span>
          <h2 className="section-title">Rides &amp; Attractions</h2>
          <p className="section-sub">
            From heart-pounding slides to chilled-out pools — every kind of fun lives here.
          </p>
        </div>

        <div className={styles.grid}>
          {rides.map((ride) => (
            <article key={ride.id} className={styles.card}>
              {/* Photo */}
              <div className={styles.photo}>
                {ride.image && !ride.image.startsWith("// TODO") ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={ride.image} alt={ride.name} loading="lazy" />
                ) : (
                  <div className={styles.placeholder}>
                    <span className={styles.placeholderIcon}>🌊</span>
                    <span className={styles.placeholderText}>TODO: Add Cloudinary image</span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className={styles.body}>
                <span className={`${styles.tag} ${styles[tagColors[ride.tag] || "tagBlue"]}`}>
                  {ride.tag}
                </span>
                <h3 className={styles.name}>{ride.name}</h3>
                <p className={styles.desc}>{ride.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
