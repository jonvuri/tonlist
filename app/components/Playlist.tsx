'use client'

import React, { useEffect, useState } from 'react'
import { useSyncedStore } from '@syncedstore/react'

import { store } from '@/app/store'

const Playlist = () => {
  const state = useSyncedStore(store)

  const handlePlayNext = () => {
    if (!state.playlist?.length) return

    state.player_state.playing_youtube_id = state.playlist[0].youtube_id
    state.playlist.splice(0, 1)
  }

  return (
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
    </div>
  )
}

export default Playlist
