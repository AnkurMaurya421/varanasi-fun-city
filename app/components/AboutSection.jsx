
"use client";
import styles from "./AboutSection.module.css";
import { useState } from "react";

export default function AboutSection() {
    const [isAboutOpen, setIsAboutOpen] = useState(true);

    return (
        <>
            {/* Toggle Buttons */}
            <div className={styles.toggleButtons}>
                <button
                    onClick={() => setIsAboutOpen(true)}
                    className={isAboutOpen ? styles.active : ""}
                >
                    About
                </button>

                <button
                    onClick={() => setIsAboutOpen(false)}
                    className={!isAboutOpen ? styles.active : ""}
                >
                    Video
                </button>
            </div>

            <section className={styles.about}>

                {/* About */}
                <div
                    className={`${styles.content} ${isAboutOpen ? styles.show : styles.hide
                        }`}
                >
                    <h2 className={styles.title}>About Varanasi Fun City</h2>

                    <p className={styles.description}>Varanasi Fun City is Varanasi's largest
                        waterpark, situated at Pandeypur Panchkosi
                        Road in the heart of Kashi. Built extensively
                        with fiberglass and decorated with mermaids,
                        it offers a rare combination of modern
                        technology and tradition.</p>
                    <p className={styles.description}>From thrilling water rides and a massive wave
                        pool to a kids play area and rain dance —
                        there is something for every age group.
                        We also offer day and night sessions, making
                        us the only waterpark in the region open
                        after sunset.</p>

                    <div className={styles.highlights}>
                        <p>8+ Ride Categories</p>
                        <p>Day & Night Sessions</p>
                        <p>Varanasi's Largest</p>
                        <p>All Age Groups Welcome</p>
                    </div>
                </div>

                {/* Video */}
                <video
                    src="/waterparkvideo.mp4"
                    controls
                    className={`${styles.iframe} ${!isAboutOpen ? styles.show : styles.hide
                        }`}
                />
            </section>
        </>
    );
}
