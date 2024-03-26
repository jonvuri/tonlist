'use client'

import React from 'react'
import { useSyncedStore } from '@syncedstore/react'

import MediaPlayer from '@/app/components/MediaPlayer'
import { store } from '@/app/store'

const MediaContainer = () => {
  const state = useSyncedStore(store)

  return (
    <div>
      {state.player_state?.playing_url ? (
        // added the key so it re-renders the MediaPlayer component
        // when same url is played
        <MediaPlayer
          key={state.player_state?.playing_start_time}
          url={state.player_state.playing_url}
          initTime={0}
        />
      ) : (
        <p>Nothing playing</p>
      )}
    </div>
  )
}

export default MediaContainer
