'use client'

import { syncedStore, getYjsDoc } from '@syncedstore/core'
import { WebrtcProvider } from 'y-webrtc'

// (optional, define types for TypeScript)
type PlaylistEntry = { youtube_id: string }

type Playlist = PlaylistEntry[]

type PlayerState = {
  playing_youtube_id?: string
}

// Create your SyncedStore store
export const store = syncedStore<{
  playlist: Playlist
  player_state: PlayerState
}>({
  playlist: [],
  player_state: {},
})

// Create a document that syncs automatically using Y-WebRTC
const doc = getYjsDoc(store)

const roomName =
  new URLSearchParams(window.location.search).get('room') || 'default-room'

export const webrtcProvider = new WebrtcProvider(roomName, doc, {
  signaling: ['ws://localhost:4444'],
})

export const disconnect = () => webrtcProvider.disconnect()
export const connect = () => webrtcProvider.connect()
