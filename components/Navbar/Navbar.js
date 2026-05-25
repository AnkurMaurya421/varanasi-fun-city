"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/siteConfig";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#timings", label: "Timings" },
  { href: "#pricing", label: "Pricing" },
  { href: "#rides", label: "Rides" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`} id="top">
      <div className={`${styles.inner} shell`}>
        {/* Logo */}
        <Link href="#top" className={styles.logo} onClick={close} aria-label="Varanasi Fun City — home">
          <img
            src={siteConfig.logo}
            alt={siteConfig.name}
            className={styles.logoImg}
            width={120}
            height={40}
          />
        </Link>

        {/* Desktop nav */}
        <nav className={styles.desktopNav} aria-label="Primary">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className={styles.navLink}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a href="#pricing" className={styles.ctaDesktop}>Check Tickets</a>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${open ? styles.active : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${open ? styles.mobileOpen : ""}`}
        aria-hidden={!open}
      >
        <nav className={styles.mobileNav} aria-label="Mobile primary">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className={styles.mobileLink} onClick={close}>
              {l.label}
            </a>
          ))}
          <a href="#pricing" className={styles.mobileCta} onClick={close}>
            🎟️ Check Tickets
          </a>
        </nav>
      </div>

      {/* Overlay */}
      {open && (
        <div className={styles.overlay} onClick={close} aria-hidden="true" />
      )}
    </header>
  );
}
