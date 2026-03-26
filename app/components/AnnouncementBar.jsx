import styles from './AnnouncementBar.module.css';

export default function AnnouncementBar() {
    return (
        <div className={styles.announcementbar}>
            <div className={styles.glasseffect}>Welcome to <strong className={styles.title}>Varanasi Fun City</strong>. Waterpark is open now!</div>
        </div>
    )
}