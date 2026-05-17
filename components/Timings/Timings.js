import { siteConfig } from "@/siteConfig";
import styles from "./Timings.module.css";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export default function Timings() {
  const { day, night } = siteConfig.shifts;

  return (
    <section className={`${styles.section} section`} id="timings">
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow">Park hours</span>
          <h2 className="section-title">Timings</h2>
          <p className="section-sub">Two shifts every day — pick the one that fits your plan.</p>
        </div>

        <div className={styles.grid}>
          {/* Day Shift */}
          <div className={`${styles.card} ${styles.dayCard}`}>
            <div className={styles.iconWrap}>
              <SunIcon />
            </div>
            <p className={styles.sublabel}>{day.sublabel.toUpperCase()}</p>
            <h3 className={styles.shiftName}>{day.label}</h3>
            <div className={styles.hours}>{day.hours}</div>
            <p className={styles.days}>{day.days}</p>
            <div className={styles.noteBox}>
              <p className={styles.note}>{day.note}</p>
            </div>
          </div>

          {/* Night Shift */}
          <div className={`${styles.card} ${styles.nightCard} ${!night.enabled ? styles.closedCard : ""}`}>
            {/* Status badge */}
            <span className={`${styles.statusBadge} ${night.enabled ? styles.open : styles.closed}`}>
              <span className={styles.statusDot} />
              {night.enabled ? "Open" : "Closed"}
            </span>

            <div className={`${styles.iconWrap} ${styles.nightIcon}`}>
              <MoonIcon />
            </div>
            <p className={styles.sublabel}>{night.sublabel.toUpperCase()}</p>
            <h3 className={styles.shiftName}>{night.label}</h3>
            <div className={styles.hours}>{night.hours}</div>
            <p className={styles.days}>{night.days}</p>
            <div className={styles.noteBox}>
              <p className={styles.note}>{night.note}</p>
            </div>

            {!night.enabled && (
              <div className={styles.reopens}>
                <ClockIcon />
                <span>Reopens {night.reopensMonth}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
