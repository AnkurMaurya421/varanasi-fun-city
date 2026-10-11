import { siteConfig } from "@/siteConfig";
import styles from "./WhatsAppButton.module.css";

export default function WhatsAppButton() {
  const number = siteConfig.contact.whatsapp;
  if (!number) return null;
  const text = encodeURIComponent("Hi Varanasi Fun City, I'd like to know more about ");
  return (
    <a
      href={`https://wa.me/${number}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.btn}
      aria-label="Chat with Varanasi Fun City on WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" fill="currentColor">
        <path d="M16.04 3C9.4 3 4 8.4 4 15.04c0 2.12.56 4.2 1.62 6.03L4 29l8.1-1.6a12 12 0 0 0 3.94.66C22.68 28.06 28 22.66 28 16.02 28 9.4 22.68 3 16.04 3Zm0 22a9.9 9.9 0 0 1-5.04-1.38l-.36-.22-4.8.95.98-4.67-.24-.38A9.9 9.9 0 1 1 16.04 25Zm5.46-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
      </svg>
      <span className={styles.label}>WhatsApp</span>
    </a>
  );
}
