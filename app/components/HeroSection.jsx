
import styles from './HeroSection.module.css';  
export default function HeroSection() {
    return (
        <section className={styles.hero}> 
            <div className={styles.content}>
                <h1 className={styles.title}>Experience the Ultimate Fun at Varanasi Fun City</h1>
                <p className={styles.subtitle}>Discover a world of excitement, adventure, and unforgettable memories for the whole family.</p>
                <li><button className={styles.bookBtn}>Book Tickets</button></li>
            </div>
        </section>
    )
}