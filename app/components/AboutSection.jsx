"use client";
import styles from "./AboutSection.module.css";
import { useState, useRef, useEffect } from "react";

export default function AboutSection() {
    const [isAboutOpen, setIsAboutOpen] = useState(true);
    const videoRef = useRef(null);
    const touchStartX = useRef(0);
    const contentRef = useRef(null);


    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            if (isAboutOpen) {
                videoElement.pause();
            } else {
                videoElement.play();
            }
        }
    }, [isAboutOpen]);

    useEffect(() => {
        const element = contentRef.current
        if (!element) return   

        const handleTouchStart = (e) => {
            console.log('touch start fired', e.touches[0].clientX)
            touchStartX.current = e.touches[0].clientX
        }

        const handleTouchEnd = (e) => {
             console.log('touch end fired', e.changedTouches[0].clientX)
            handleSwipe(e.changedTouches[0].clientX)
        }

        element.addEventListener('touchstart', handleTouchStart, { passive: false })
        element.addEventListener('touchend', handleTouchEnd, { passive: false })

        return () => {
            element.removeEventListener('touchstart', handleTouchStart)
            element.removeEventListener('touchend', handleTouchEnd)
        }
    }, [])

useEffect(() => {
  console.log('contentRef:', contentRef.current)
}, [])

    function handleSwipe(endPos) {
        let swipeLength = touchStartX.current - endPos;
        if (swipeLength > 50) {
            setIsAboutOpen(false);
        }
        if (swipeLength < -50) {
            setIsAboutOpen(true);
        }
    }

    return (
        <>
            <div
                className={styles.aboutSection}
                onTouchStart={(e) => {
                    touchStartX.current = e.touches[0].clientX;
                }}
                onTouchEnd={(e) => handleSwipe(e.changedTouches[0].clientX)}
            >
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
                    <div
                        className={`${styles.content} ${isAboutOpen ? styles.show : styles.hide
                            }`}
                        ref={contentRef}
                    >
                        <p className={styles.description}>
                            Varanasi Fun City is Varanasi's largest waterpark, situated at
                            Pandeypur Panchkosi Road in the heart of Kashi. Built extensively
                            with fiberglass and decorated with mermaids, it offers a rare
                            combination of modern technology and tradition. From thrilling
                            water rides and a massive wave pool to a kids play area and rain
                            dance — there is something for every age group. We also offer day
                            and night sessions, making us the only waterpark in the region
                            open after sunset.
                        </p>

                        <div className={styles.highlights}>
                            <div className={styles.highlightItem}>
                                <span className={styles.highlightNumber}>Largest</span>
                                <span className={styles.highlightLabel}>in Varanasi</span>
                            </div>
                            <div className={styles.highlightItem}>
                                <span className={styles.highlightNumber}>20+</span>
                                <span className={styles.highlightLabel}>
                                    Rides & Attractions
                                </span>
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
                    <video
                        src="/waterparkvideo.mp4"
                        controls
                        muted
                        ref={videoRef}
                        onMouseEnter={() => videoRef.current.play()}
                        onMouseLeave={() => videoRef.current.pause()}
                        className={`${styles.iframe} ${!isAboutOpen ? styles.show : styles.hide
                            }`}
                    />
                </section>
            </div>
        </>
    );
}