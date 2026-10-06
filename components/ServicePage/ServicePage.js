import Link from "next/link";
import { siteConfig } from "@/siteConfig";
import { getRelated, categories } from "@/servicesConfig";
import { JsonLdScript, faqSchema, serviceSchema } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import styles from "./ServicePage.module.css";

export default function ServicePage({ service }) {
  const related = getRelated(service);
  const hub = categories[service.category];
  const breadcrumbItems = [{ label: "Home", href: "/" }];
  if (hub.href !== `/${service.slug}/`) {
    breadcrumbItems.push({ label: hub.label, href: hub.href });
  }
  breadcrumbItems.push({ label: service.h1, href: `/${service.slug}/` });

  return (
    <>
      <JsonLdScript data={serviceSchema(service)} />
      <JsonLdScript data={faqSchema(service.faqs)} />

      <div className="shell">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className="shell">
          <div className={styles.heroGrid}>
            <div>
              <span className="eyebrow">{service.eyebrow}</span>
              <h1 className={styles.h1}>{service.h1}</h1>
              {service.intro.map((p, i) => (
                <p key={i} className={styles.para}>{p}</p>
              ))}
              <div className={styles.actions}>
                <a href={siteConfig.contact.phoneHref} className={styles.ctaPrimary}>
                  📞 Call {siteConfig.contact.phone}
                </a>
                <a href="#enquire" className={styles.ctaSecondary}>Enquire ↓</a>
              </div>
            </div>

            <div className={styles.heroMedia}>
              {service.hero?.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={service.hero.image} alt={service.hero.alt} className={styles.heroImg} />
              ) : (
                <div className={styles.photoPlaceholder}>
                  <span className={styles.placeholderIcon}>📷</span>
                  <span className={styles.placeholderText}>
                    Real event photographs coming soon
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why choose */}
      {service.whyChoose && (
        <section className={`${styles.section} section`}>
          <div className="shell">
            <div className="section-head">
              <h2 className="section-title">Why Choose Varanasi Fun City</h2>
            </div>
            <ul className={styles.checklist}>
              {service.whyChoose.map((item) => (
                <li key={item}>
                  <span className={styles.check} aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* How booking works — shared process, same for every service page */}
      <section className={`${styles.section} section`}>
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow">Booking process</span>
            <h2 className="section-title">How Booking Works</h2>
          </div>
          <ol className={styles.steps}>
            <li>
              <span className={styles.stepNum}>1</span>
              <div>
                <h3 className={styles.stepTitle}>Call or email with your date</h3>
                <p className={styles.stepText}>Share the occasion, your preferred date and a rough guest count.</p>
              </div>
            </li>
            <li>
              <span className={styles.stepNum}>2</span>
              <div>
                <h3 className={styles.stepTitle}>Discuss what you need</h3>
                <p className={styles.stepText}>We go through catering, decoration, stage/DJ and parking — in-house or your own approved vendors.</p>
              </div>
            </li>
            <li>
              <span className={styles.stepNum}>3</span>
              <div>
                <h3 className={styles.stepTitle}>Visit the venue if you&apos;d like</h3>
                <p className={styles.stepText}>Come see the lawn or hall in person before confirming, especially for a wedding or larger function.</p>
              </div>
            </li>
            <li>
              <span className={styles.stepNum}>4</span>
              <div>
                <h3 className={styles.stepTitle}>Confirm your date</h3>
                <p className={styles.stepText}>Once details are settled, we lock in the date for your function.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Planning tips — per page */}
      {service.planningTips && (
        <section className={`${styles.section} section alt`}>
          <div className="shell">
            <div className="section-head">
              <span className="eyebrow">Worth knowing</span>
              <h2 className="section-title">Good to Know Before You Book</h2>
            </div>
            <ul className={styles.tipList}>
              {service.planningTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Use cases */}
      {service.useCases && (
        <section className={`${styles.section} section alt`}>
          <div className="shell">
            <div className="section-head">
              <h2 className="section-title">What It&apos;s Used For</h2>
            </div>
            <div className={styles.pillRow}>
              {service.useCases.map((u) => (
                <span key={u} className={styles.pill}>{u}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Facilities */}
      {service.facilities && (
        <section className={`${styles.section} section`}>
          <div className="shell">
            <div className="section-head">
              <span className="eyebrow">Venue facilities</span>
              <h2 className="section-title">What&apos;s Available</h2>
              {service.capacityNote && (
                <p className="section-sub">{service.capacityNote}</p>
              )}
            </div>
            <div className={styles.facilityGrid}>
              {service.facilities.map((f) => (
                <div key={f.id} className={styles.facilityCard}>
                  <h3 className={styles.facilityLabel}>{f.label}</h3>
                  <p className={styles.facilityNote}>{f.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {service.faqs && (
        <section className={`${styles.section} section alt`}>
          <div className="shell">
            <div className="section-head">
              <h2 className="section-title">Frequently Asked Questions</h2>
            </div>
            <div className={styles.faqList}>
              {service.faqs.map((f) => (
                <details key={f.q} className={styles.faqItem}>
                  <summary className={styles.faqQ}>{f.q}</summary>
                  <p className={styles.faqA}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Getting there — shared, same real address on every page */}
      <section className={`${styles.section} section alt`}>
        <div className="shell">
          <div className={styles.gettingThereGrid}>
            <div>
              <span className="eyebrow">Location</span>
              <h2 className="section-title">Getting There</h2>
              <p className={styles.para}>
                Varanasi Fun City is at {siteConfig.contact.address}. It&apos;s a well-known landmark
                on Panchkoshi Road, easily reached from Ashapur, Pahariya and other nearby parts of Varanasi.
              </p>
              <div className={styles.actions}>
                <a href={siteConfig.contact.mapUrl} target="_blank" rel="noopener noreferrer" className={styles.ctaSecondary}>
                  📍 Get Directions
                </a>
              </div>
            </div>
            <div className={styles.mapEmbedWrap}>
              <iframe
                src={siteConfig.contact.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Varanasi Fun City location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className={`${styles.section} section`}>
          <div className="shell">
            <div className="section-head">
              <h2 className="section-title">Related Pages</h2>
            </div>
            <div className={styles.relatedGrid}>
              {related.map((r) => (
                <Link key={r.slug} href={`/${r.slug}/`} className={styles.relatedCard}>
                  {r.h1} →
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Enquiry CTA */}
      <section id="enquire" className={styles.enquire}>
        <div className={`shell ${styles.enquireInner}`}>
          <h2 className={styles.enquireTitle}>Plan Your Booking at Varanasi Fun City</h2>
          <p className={styles.enquireSub}>
            Call or email us with your date and requirements — we&apos;ll walk you through what&apos;s available.
          </p>
          <div className={styles.actions}>
            <a href={siteConfig.contact.phoneHref} className={styles.ctaPrimary}>
              📞 {siteConfig.contact.phone}
            </a>
            <a href={siteConfig.contact.phone2Href} className={styles.ctaSecondary}>
              📞 {siteConfig.contact.phone2}
            </a>
            {siteConfig.contact.email && !siteConfig.contact.email.startsWith("// TODO") && (
              <a href={`mailto:${siteConfig.contact.email}`} className={styles.ctaSecondary}>
                ✉️ Email Us
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
