'use client'

import React from 'react'
import { useSyncedStore } from '@syncedstore/react'

import MediaPlayer from '@/app/components/MediaPlayer'
import { Store } from '@/app/store'

type Props = {
  store: Store
}

const MediaContainer = ({ store }: Props) => {
  const state = useSyncedStore(store)

  return (
    <>
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
    </>
  )
}

export default MediaContainer
