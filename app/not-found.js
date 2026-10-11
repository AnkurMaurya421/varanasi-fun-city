import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { services } from "@/servicesConfig";
import { siteConfig } from "@/siteConfig";
import styles from "./not-found.module.css";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <section className="section">
          <div className="shell">
            <div className={styles.box}>
              <p className={styles.code}>404</p>
              <h1 className="section-title">We couldn&apos;t find that page</h1>
              <p className="section-sub">
                The link may be old or mistyped. Try one of these, or call us on{" "}
                <a href={siteConfig.contact.phoneHref}>{siteConfig.contact.phone}</a>.
              </p>
              <div className={styles.links}>
                <Link href="/" className={styles.link}>Home</Link>
                {services.map((s) => (
                  <Link key={s.slug} href={`/${s.slug}/`} className={styles.link}>{s.title}</Link>
                ))}
                <Link href="/gallery/" className={styles.link}>Gallery</Link>
                <Link href="/contact/" className={styles.link}>Contact</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
