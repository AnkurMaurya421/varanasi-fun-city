import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Chatbot from "@/components/Chatbot/Chatbot";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { siteConfig } from "@/siteConfig";
import styles from "./contact.module.css";

const BASE_URL = siteConfig.seo.canonicalUrl;

export const metadata = {
  title: "Contact Us",
  description:
    "Contact Varanasi Fun City for water-park visits, wedding lawn bookings, and event or party enquiries in Varanasi.",
  alternates: { canonical: `${BASE_URL}/contact/` },
};

export default function ContactPage() {
  const { contact } = siteConfig;

  return (
    <>
      <Navbar />
      <main>
        <div className="shell">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact", href: "/contact/" }]} />
        </div>

        <section className="section">
          <div className="shell">
            <div className="section-head">
              <span className="eyebrow">Get in touch</span>
              <h1 className="section-title">Contact Varanasi Fun City</h1>
              <p className="section-sub">
                For tickets, group bookings, or wedding/event/party enquiries — call, email or visit us.
              </p>
            </div>

            <div className={styles.grid}>
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>Phone</h2>
                <a href={contact.phoneHref} className={styles.link}>{contact.phone}</a>
                <a href={contact.phone2Href} className={styles.link}>{contact.phone2}</a>
              </div>

              {contact.email && !contact.email.startsWith("// TODO") && (
                <div className={styles.card}>
                  <h2 className={styles.cardTitle}>Email</h2>
                  <a href={`mailto:${contact.email}`} className={styles.link}>{contact.email}</a>
                </div>
              )}

              <div className={styles.card}>
                <h2 className={styles.cardTitle}>Address</h2>
                <p className={styles.text}>{contact.address}</p>
                <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  Get directions →
                </a>
              </div>

              <div className={styles.card}>
                <h2 className={styles.cardTitle}>What can we help with?</h2>
                <ul className={styles.list}>
                  <li><a href="/water-park-varanasi/" className={styles.plainLink}>Water park tickets & timings</a></li>
                  <li><a href="/wedding-lawn-varanasi/" className={styles.plainLink}>Wedding lawn bookings</a></li>
                  <li><a href="/event-venue-varanasi/" className={styles.plainLink}>Event venue bookings</a></li>
                  <li><a href="/party-venue-varanasi/" className={styles.plainLink}>Birthday & kitty parties</a></li>
                </ul>
              </div>
            </div>

            <div className={styles.mapWrap}>
              <iframe
                src={contact.mapEmbed}
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
        </section>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
