'use client'

import React, { useEffect, useState } from 'react'

import MediaContainer from '@/app/components/MediaContainer'
import Playlist from '@/app/components/Playlist'

import styles from './page.module.css'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true) // Ensures the component mounts after the first render
  }, [])

  return (
    mounted && (
      <main className={styles.main}>
        <div className={styles.description}>
          <p>Player:</p>
        </div>

        <div className={styles.center}>
          <MediaContainer />
        </div>

        <Playlist />
      </main>
    )
  )
}
