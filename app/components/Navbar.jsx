"use client";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { CircleX } from "lucide-react";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsMenuOpen(false);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Image
            src="/mainlogo.png"
            alt="Hero Image"
            width={267}
            height={150}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <ul className={styles.navLinks}>
          <li>
            <a href="/">About</a>
          </li>
          <li>
            <a href="/">Rides</a>
          </li>
          <li>
            <a href="/">Pricing</a>
          </li>
          <li>
            <a href="/">Timing</a>
          </li>
          <li>
            <a href="/">Gallery</a>
          </li>
          <li>
            <a href="/">Events</a>
          </li>
          <li>
            <a href="/">Contact</a>
          </li>
        </ul>
        {isMenuOpen ? (
          <CircleX
            className={styles.menuBtn}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        ) : (
          <Menu
            className={styles.menuBtn}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        )}
      </nav>

      <nav className={styles.mobileNav}>
        <ul
          className={`${styles.mobileNavLinks} ${
            isMenuOpen ? styles.open : ""
          }`}
        >
          <li>
            <a href="/">About</a>
          </li>
          <li>
            <a href="/">Rides</a>
          </li>
          <li>
            <a href="/">Pricing</a>
          </li>
          <li>
            <a href="/">Timing</a>
          </li>
          <li>
            <a href="/">Gallery</a>
          </li>
          <li>
            <a href="/">Events</a>
          </li>
          <li>
            <a className={styles.contactBtn} href="/">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}