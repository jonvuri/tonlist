'use client'

import React, { useEffect, useState } from 'react'
import { useSyncedStore } from '@syncedstore/react'

import YoutubePlayer from './components/YoutubePlayer'
import { store } from './store'

import styles from './page.module.css'

export default function Home() {
  // The store will load the initial state faster than the first render,
  // so React will complain the first client render doesn't match the server's
  // render. We mount it after the first render with an effect to avoid this.
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const state = useSyncedStore(store)

  const [startTime, setStartTime] = useState(0)

  const handlePlayNext = () => {
    if (!state.playlist?.length) return

    state.player_state.playing_youtube_id = state.playlist[0].youtube_id
    state.playlist.splice(0, 1)
  }

  return (
    mounted && (
      <main className={styles.main}>
        <div className={styles.description}>
          <p>Player:</p>
        </div>

        <div className={styles.center}>
          {state.player_state?.playing_youtube_id ? (
            <YoutubePlayer
              songId={state.player_state?.playing_youtube_id}
              songStart={startTime}
            />
          ) : (
            <p>Nothing playing</p>
          )}
        </div>

        <div>
          <p>Now playing:</p>
          <b>{state.player_state?.playing_youtube_id}</b>
          <p>Playlist:</p>
          <ul>
            {state.playlist?.map((entry, i) => {
              return <li key={i}>{entry.youtube_id}</li>
            })}
          </ul>
          <input
            placeholder="Enter a YouTube video ID (last part of the YouTube URL) and hit enter"
            type="text"
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                const target = event.target as HTMLInputElement
                // Add a todo item using the text added in the textfield
                state.playlist?.push({ youtube_id: target.value })
                target.value = ''
              }
            }}
            style={{ width: '200px', maxWidth: '100%' }}
          />
          <button onClick={handlePlayNext}>Play next</button>
          <input
            type="number"
            value={startTime}
            onChange={(e) => setStartTime(Number(e.target.value))}
          />
        </div>
      </main>
    )
  )
}
