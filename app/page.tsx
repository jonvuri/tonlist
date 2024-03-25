'use client'

import React, { useEffect, useState } from 'react'
import { useSyncedStore } from '@syncedstore/react'

import { store } from './store'

import styles from './page.module.css'
import MediaPlayer from '@/app/components/MediaPlayer'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true) // Ensures the component mounts after the first render
  }, [])

  const state = useSyncedStore(store)
  const [startTime, setStartTime] = useState(0)
  const [playCounter, setPlayCounter] = useState(0) // Added playCounter state

  const handlePlayNext = () => {
    if (!state.playlist?.length) return

    state.player_state.playing_youtube_id = state.playlist[0].youtube_id
    state.playlist.splice(0, 1)

    // Using this method to force re-render MediaPlayer component
    // is there a better way to do this?
    setPlayCounter((prevCounter) => prevCounter + 1)
  }

  return (
    mounted && (
      <main className={styles.main}>
        <div className={styles.description}>
          <p>Player:</p>
        </div>

        <div className={styles.center}>
          {state.player_state?.playing_youtube_id ? (
            // added the key so it re-renders the MediaPlayer component
            // when same url is played
            <MediaPlayer
              key={`${state.player_state.playing_youtube_id}-${playCounter}`}
              url={state.player_state.playing_youtube_id}
              initTime={startTime}
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
            {state.playlist?.map((entry, index) => (
              <li key={index}>{entry.youtube_id}</li>
            ))}
          </ul>
          <input
            placeholder="Enter URL to add to playlist"
            type="text"
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                const target = event.target as HTMLInputElement
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
