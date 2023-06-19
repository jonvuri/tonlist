import styles from './page.module.css'

import YoutubeControl from './components/YoutubeControl'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Player:</p>
      </div>

      <div className={styles.center}>
        <YoutubeControl />
      </div>
    </main>
  )
}
