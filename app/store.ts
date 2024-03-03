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
export const webrtcProvider = new WebrtcProvider('syncedstore-playlist', doc)

export const disconnect = () => webrtcProvider.disconnect()
export const connect = () => webrtcProvider.connect()
