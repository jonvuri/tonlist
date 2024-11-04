'use client'

import React from 'react'
import { syncedStore, getYjsDoc } from '@syncedstore/core'
import { WebrtcProvider } from 'y-webrtc'
import { humanId } from 'human-id'

export type PlaylistEntry = { url: string }

type Playlist = PlaylistEntry[]

type PlayerState = {
  playing_url?: string
  playing_start_time?: number
}

type StoreShape = {
  playlist: Playlist
  player_state: PlayerState
  play_history: Playlist
}

export type Store = ReturnType<typeof syncedStore<StoreShape>>

const getRoomName = () => {
  let roomName = new URLSearchParams(window.location.search).get('room')

  if (!roomName) {
    roomName = humanId({
      separator: '-',
      capitalize: false,
    })
    window.history.replaceState({}, '', `?room=${roomName}`)
  }

  return roomName
}

export const useStore = () => {
  const [store, setStore] = React.useState<Store | null>(null)

  React.useEffect(() => {
    const store = syncedStore<StoreShape>({
      playlist: [],
      player_state: {},
      play_history: [],
    })

    const doc = getYjsDoc(store)

    const roomName = getRoomName()

    const webrtcProvider = new WebrtcProvider(roomName, doc, {
      signaling: ['ws://localhost:4444'],
    })

    setStore(store)

    return () => {
      webrtcProvider.disconnect()
    }
  }, [])

  return store
}
