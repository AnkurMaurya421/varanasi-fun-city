import Image from 'next/image';
import styles from './HeroSection.module.css';  
export default function HeroSection() {
    return (
        <section className={styles.hero}>
            <div className="hero-content">
                <Image src="/mainlogo.png" alt="Hero Image" width={200} height={300} />
            </div>
        </section>
    )
}