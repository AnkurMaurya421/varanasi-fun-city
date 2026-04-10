
"use client";
import styles from "./AboutSection.module.css";
import { useState } from "react";

export default function AboutSection() {
    const [isAboutOpen, setIsAboutOpen] = useState(true);

    return (
        <>
            <div className={styles.aboutSection}>
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
                            <div className={styles.highlightItem}>
                                <span className={styles.highlightNumber}>Largest</span>
                                <span className={styles.highlightLabel}>in Varanasi</span>
                            </div>
                            <div className={styles.highlightItem}>
                                <span className={styles.highlightNumber}>20+</span>
                                <span className={styles.highlightLabel}>Rides & Attractions</span>
                            </div>
                            <div className={styles.highlightItem}>
                                <span className={styles.highlightNumber}>Day&Night</span>
                                <span className={styles.highlightLabel}>Sessions</span>
                            </div>
                            <div className={styles.highlightItem}>
                                <span className={styles.highlightNumber}>Large</span>
                                <span className={styles.highlightLabel}>WavePool</span> 
                              </div>

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
            </div>
        </>
    );
}
