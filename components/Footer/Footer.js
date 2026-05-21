import { siteConfig } from "@/siteConfig";
import styles from "./Footer.module.css";

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8A3 3 0 0 0 2.6 20c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.2A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
      <path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1-3.2 0-3.6 0-4.8-.1-3.2-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12c0-3.2 0-3.6.1-4.8C2.4 3.9 4 2.3 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0-2.2C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9C.3 21.3 2.7 23.7 7.1 23.9 8.3 24 8.7 24 12 24s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
      <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.5h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 21.72 16.92z" />
    </svg>
  );
}

export default function Footer() {
  const { name, contact, socials, agency } = siteConfig;

  return (
    <footer className={styles.footer} id="contact">
      {/* Wave shape top */}
      <div className={styles.wave} aria-hidden="true">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,0 L0,0 Z"
            fill="#f0f9ff"
          />
        </svg>
      </div>

      <div className={`${styles.inner} shell`}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <h3 className={styles.brandName}>{name}</h3>
            <p className={styles.brandDesc}>
              The biggest waterpark in Varanasi. Open all year — splash through summer, dance through monsoon.
            </p>
            <div className={styles.socials}>
              <a href={socials.youtube} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="YouTube">
                <YoutubeIcon />
              </a>
              <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Google Maps">
                <MapIcon />
              </a>
            </div>
          </div>

          {/* Visit */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Visit Us</h4>
            <div className={styles.mapEmbed}>
              <iframe
                src={contact.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "inherit" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Varanasi Fun City location"
              />
            </div>
            <p className={styles.address}>{contact.address}</p>
          </div>

          {/* Contact */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contact</h4>
            <a href={contact.phoneHref} className={styles.phoneLink}>
              <PhoneIcon />
              {contact.phone}
            </a>
            <a href={contact.phone2Href} className={styles.phoneLink}>
              <PhoneIcon />
              {contact.phone2}
            </a>
            {contact.email && !contact.email.startsWith("// TODO") && (
              <a href={`mailto:${contact.email}`} className={styles.emailLink}>
                {contact.email}
              </a>
            )}
          </div>

          {/* Quick links */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <nav aria-label="Footer navigation">
              <ul className={styles.links}>
                <li><a href="#about">About</a></li>
                <li><a href="#timings">Timings</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#rides">Rides</a></li>
                <li><a href="#testimonials">Reviews</a></li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
          <p>
            Designed &amp; Developed by{" "}
            {/*<a
              href={agency.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.agencyLink}
            >
              {agency.name}
            </a> */}
            
          </p>
        </div>
      </div>
    </footer>
  );
}