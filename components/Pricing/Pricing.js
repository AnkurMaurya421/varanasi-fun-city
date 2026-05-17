"use client";

import { useState } from "react";
import { siteConfig } from "@/siteConfig";
import styles from "./Pricing.module.css";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v1M12 20v1M4.2 4.2l.8.8M19 19l.8.8M3 12h1M20 12h1M4.2 19.8l.8-.8M19 5l.8-.8" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
    </svg>
  );
}

function LockerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 4v16M14 11h2" />
    </svg>
  );
}

function CostumeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
      <path d="M6 3l3 3 3-1 3 1 3-3 2 4-3 2v12H7V9L4 7z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

const TAB_KEYS = ["weekday", "weekend", "holiday"];

export default function Pricing() {
  const [activeTab, setActiveTab] = useState("weekday");
  const { pricing, pricingMeta, extras, shifts } = siteConfig;
  const nightEnabled = shifts.night.enabled;
  const panel = pricing[activeTab];

  function formatAmount(amount) {
    if (amount === 0) return "FREE";
    if (amount === null || amount === undefined) return null;
    return `₹${amount}`;
  }

  return (
    <section className={`${styles.section} section`} id="pricing">
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow">Tickets</span>
          <h2 className="section-title">Pricing</h2>
          <p className="section-sub">All prices are per person, taxes included. Kids under 3 ft enter free.</p>
        </div>

        {/* Tabs */}
        <div className={styles.tabs} role="tablist" aria-label="Day type">
          {TAB_KEYS.map((key) => (
            <button
              key={key}
              role="tab"
              className={`${styles.tab} ${activeTab === key ? styles.activeTab : ""}`}
              aria-selected={activeTab === key}
              onClick={() => setActiveTab(key)}
            >
              {pricing[key].label}
            </button>
          ))}
        </div>

        {/* Price cards */}
        <div className={styles.cards}>
          {/* Day shift */}
          <div className={`${styles.card} ${styles.dayCard}`}>
            <div className={styles.cardHead}>
              <div className={`${styles.cardIcon} ${styles.sunIcon}`}><SunIcon /></div>
              <div>
                <h3 className={styles.cardTitle}>Day Shift</h3>
                <p className={styles.cardSub}>{siteConfig.shifts.day.hours}</p>
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.rows}>
              <div className={styles.row}>
                <div>
                  <div className={styles.rowName}>Adult</div>
                  <div className={styles.rowMeta}>{pricingMeta.adult}</div>
                </div>
                <div className={styles.amount}>{formatAmount(panel.day.adult)}</div>
              </div>
              <div className={styles.divider} />
              <div className={styles.row}>
                <div>
                  <div className={styles.rowName}>Kid</div>
                  <div className={styles.rowMeta}>{pricingMeta.kid}</div>
                </div>
                <div className={styles.amount}>{formatAmount(panel.day.kid)}</div>
              </div>
              <div className={styles.divider} />
              <div className={styles.row}>
                <div>
                  <div className={styles.rowName}>Toddler</div>
                  <div className={styles.rowMeta}>{pricingMeta.toddler}</div>
                </div>
                <div className={`${styles.amount} ${styles.free}`}>FREE</div>
              </div>
            </div>
          </div>

          {/* Night shift */}
          <div className={`${styles.card} ${styles.nightCard} ${!nightEnabled ? styles.closedCard : ""}`}>
            <span className={`${styles.statusPill} ${nightEnabled ? styles.pillOpen : styles.pillClosed}`}>
              <span className={styles.pillDot} />
              {nightEnabled ? "Open" : "Closed"}
            </span>

            <div className={styles.cardHead}>
              <div className={`${styles.cardIcon} ${styles.moonIcon} ${!nightEnabled ? styles.moonClosed : ""}`}><MoonIcon /></div>
              <div>
                <h3 className={`${styles.cardTitle} ${!nightEnabled ? styles.dimText : ""}`}>Night Shift</h3>
                <p className={`${styles.cardSub} ${!nightEnabled ? styles.dimText : ""}`}>{siteConfig.shifts.night.hours}</p>
              </div>
            </div>

            <div className={styles.divider} />

            <div className={`${styles.rows} ${!nightEnabled ? styles.dimRows : ""}`}>
              <div className={styles.row}>
                <div>
                  <div className={styles.rowName}>Adult</div>
                  <div className={styles.rowMeta}>{pricingMeta.adult}</div>
                </div>
                <div className={styles.amount}>₹{panel.night.adult}</div>
              </div>
              <div className={styles.divider} />
              <div className={styles.row}>
                <div>
                  <div className={styles.rowName}>Kid</div>
                  <div className={styles.rowMeta}>{pricingMeta.kid}</div>
                </div>
                <div className={styles.amount}>₹{panel.night.kid}</div>
              </div>
              <div className={styles.divider} />
              <div className={styles.row}>
                <div>
                  <div className={styles.rowName}>Toddler</div>
                  <div className={styles.rowMeta}>{pricingMeta.toddler}</div>
                </div>
                <div className={`${styles.amount} ${styles.free}`}>FREE</div>
              </div>
            </div>

            {!nightEnabled && (
              <div className={styles.reopensNote}>
                <ClockIcon />
                <span>Reopens {shifts.night.reopensMonth}</span>
              </div>
            )}
          </div>
        </div>

        {/* Extras */}
        <div className={styles.extras}>
          <div className={styles.extraCard}>
            <div className={styles.extraHead}>
              <div className={styles.extraIcon}><LockerIcon /></div>
              <h3 className={styles.extraTitle}>{extras.locker.label}</h3>
            </div>
            <div className={styles.extraRows}>
              <div className={styles.extraRow}>
                <span className={styles.extraName}>Standard Locker</span>
                <div className={styles.extraVals}>
                  <span className={styles.extraFee}>₹{extras.locker.charge}</span>
                  <span className={styles.extraDeposit}>+ ₹{extras.locker.deposit} refundable</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.extraCard}>
            <div className={styles.extraHead}>
              <div className={styles.extraIcon}><CostumeIcon /></div>
              <h3 className={styles.extraTitle}>{extras.costume.label}</h3>
              {extras.costume.compulsory && (
                <span className={styles.compulsoryBadge}>⚠ Compulsory</span>
              )}
            </div>
            <div className={styles.extraRows}>
              <div className={styles.extraRow}>
                <span className={styles.extraName}>Male</span>
                <div className={styles.extraVals}>
                  <span className={styles.extraFee}>₹{extras.costume.male.charge}</span>
                  <span className={styles.extraDeposit}>+ ₹{extras.costume.male.deposit} refundable</span>
                </div>
              </div>
              <div className={styles.extraRow}>
                <span className={styles.extraName}>Female</span>
                <div className={styles.extraVals}>
                  <span className={styles.extraFee}>₹{extras.costume.female.charge}</span>
                  <span className={styles.extraDeposit}>+ ₹{extras.costume.female.deposit} refundable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
