import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Chatbot from "@/components/Chatbot/Chatbot";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { siteConfig } from "@/siteConfig";
import styles from "./privacy.module.css";

export const metadata = {
  title: "Privacy Policy",
  description: "How Varanasi Fun City handles information on this website, including the chat assistant, enquiries and third-party content.",
  alternates: { canonical: `${siteConfig.seo.canonicalUrl}/privacy-policy/` },
};

export default function PrivacyPolicyPage() {
  const { name, contact } = siteConfig;

  return (
    <>
      <Navbar />
      <main>
        <div className="shell">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy", href: "/privacy-policy/" }]} />
        </div>

        <section className="section">
          <div className={`shell ${styles.prose}`}>
            <h1 className="section-title">Privacy Policy</h1>
            <p className={styles.updated}>Last updated: 11 October 2026</p>

            <p>
              This page explains what information {name} (&quot;we&quot;) handles when you use this website.
              We keep it simple because the site is simple: there are no user accounts, no online payments and no sign-up forms.
            </p>

            <h2>Who we are</h2>
            <p>
              {name}, {contact.address}.<br />
              Phone: {contact.phone} / {contact.phone2}<br />
              Email: {contact.email}
            </p>

            <h2>Enquiries and bookings</h2>
            <p>
              If you call, email or message us to ask about tickets, a wedding, event or party, we use the details you share
              (such as your name, phone number, date and requirements) only to answer your enquiry and manage your booking.
              We do not sell your personal information.
            </p>

            <h2>Chat assistant</h2>
            <p>
              The chat assistant on this site answers questions about the park. The messages you type are sent to our AI provider
              (Groq) so it can generate a reply. This website does not save your chat messages on our own servers. To prevent abuse,
              your IP address is held briefly in the server&apos;s memory to limit how many messages can be sent per hour.
              Please do not type sensitive personal information into the chat.
            </p>

            <h2>Hosting and technical data</h2>
            <p>
              The site is hosted on Vercel. Like most websites, the hosting provider may automatically log technical information
              such as IP address, browser type and the pages requested, for security and to keep the site running.
            </p>

            <h2>Third-party content</h2>
            <p>
              Some content on this site comes from other companies, including Google (the map on our contact section, Google Fonts,
              and Google reviews), YouTube and Instagram links. These providers may use cookies or collect information according to
              their own privacy policies. We do not control that.
            </p>

            <h2>Google reviews</h2>
            <p>
              Reviews shown on this site are public reviews that customers chose to post on Google, shown with the name they used.
              Reviews and our replies are managed through our Google Business Profile. To change or remove a review, use your
              Google account.
            </p>

            <h2>Children</h2>
            <p>
              This site is for general information and is not directed at children. We do not knowingly collect personal information from children through it.
            </p>

            <h2>Your choices</h2>
            <p>
              You can ask us what details we hold from your enquiry, or ask us to delete them, by calling or emailing us using the details above.
            </p>

            <h2>Changes</h2>
            <p>
              If we change how the site works in a way that affects this policy (for example, by adding analytics), we will update this page and its date.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
