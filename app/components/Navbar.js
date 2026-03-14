import styles from "./Navbar.module.css";
import Image from "next/image";
export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                Varanasi <span >Fun City</span>
            </div>
            <ul className={styles.navLinks}>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    )
}