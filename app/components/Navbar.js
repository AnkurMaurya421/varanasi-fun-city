"use client"
import styles from "./Navbar.module.css";
import {useState} from "react";
import { Menu } from "lucide-react";
import { CircleX } from "lucide-react";
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    return (<>
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                Varanasi <span >Fun City</span>
            </div>
            <ul className={styles.navLinks}>
                <li><a href="/">About</a></li>
                <li><a href="/">Rides</a></li>
                <li><a href="/">Pricing</a></li>
                <li><a href="/">Timing</a></li>
                <li><a href="/">Gallery</a></li>
                <li><a href="/">Events</a></li>
                <li><a href="/">Contact</a></li>
                <li><button className={styles.bookBtn}>Book Tickets</button></li>
                
            </ul>
            {isMenuOpen ? (
                <CircleX className={styles.menuBtn} onClick={() => setIsMenuOpen(!isMenuOpen)} />
            ) : (
                <Menu className={styles.menuBtn} onClick={() => setIsMenuOpen(!isMenuOpen)} />
            )}
        </nav>
        {isMenuOpen?
        <nav className={styles.mobileNav}>
            <ul className={styles.mobileNavLinks}> 
                <li><a href="/">About</a></li>
                <li><a href="/">Rides</a></li>
                <li><a href="/">Pricing</a></li>
                <li><a href="/">Timing</a></li>
                <li><a href="/">Gallery</a></li>
                <li><a href="/">Events</a></li>
                <li><a href="/">Contact</a></li>
                <li><button className={styles.bookBtn}>Book Tickets</button></li>
            </ul>
        </nav>:null}
    </>
    )
}