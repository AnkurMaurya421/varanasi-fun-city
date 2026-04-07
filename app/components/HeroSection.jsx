
import styles from './HeroSection.module.css';
export default function HeroSection() {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <div className={styles.glassBox}>
                    <h2 className={styles.title}>Experience the Ultimate Fun at Varanasi Fun City</h2>
                    <button className={styles.bookBtn}>Book Tickets</button>
                    <p className={styles.subtitle}>Discover a world of excitement, adventure, and unforgettable memories for the whole family.</p>
                </div>

            </div>
        </section>
    )
}