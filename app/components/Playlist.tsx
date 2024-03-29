'use client'

import React from 'react'
import { useSyncedStore } from '@syncedstore/react'

import { store, PlaylistEntry } from '@/app/store'

const validUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch (_) {
    return false
  }
}

type PlaylistEntryRowProps = {
  entry: PlaylistEntry
  onChange: (entry: PlaylistEntry) => void
  onRemove: () => void
}

const PlaylistEntryRow = ({
  entry,
  onChange,
  onRemove,
}: PlaylistEntryRowProps) => {
  const [editing, setEditing] = React.useState(false)
  const [editedUrl, setEditedUrl] = React.useState(entry.url)

  const saveChanges = () => {
    onChange({ url: editedUrl })
    setEditing(false)
  }

  return editing ? (
    <>
      <input
        placeholder="Enter URL"
        type="text"
        value={editedUrl}
        onChange={(event) => {
          setEditedUrl(event.target.value)
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            saveChanges()
          }
        }}
      />
      <button onClick={saveChanges} disabled={!validUrl(editedUrl)}>
        Save
      </button>
    </>
  ) : (
    <>
      URL: {entry.url}
      <button onClick={() => setEditing(true)}>Edit</button>
      <button onClick={onRemove}>Remove</button>
    </>
  )
}

const Playlist = () => {
  const state = useSyncedStore(store)

  const handlePlayNext = () => {
    if (!state.playlist?.length) return

    state.player_state.playing_url = state.playlist[0].url
    state.player_state.playing_start_time = Date.now()
    state.playlist.splice(0, 1)
  }

  return (
    <div>
      <p>Now playing:</p>
      <b>{state.player_state?.playing_url}</b>
      <p>Playlist:</p>
      <ul>
        {state.playlist?.map((entry, index) => (
          <li key={index}>
            <PlaylistEntryRow
              entry={entry}
              onChange={(changedEntry) => {
                state.playlist?.splice(index, 1, changedEntry)
              }}
              onRemove={() => {
                state.playlist?.splice(index, 1)
              }}
            />
          </li>
        ))}
      </ul>
      <input
        placeholder="Enter URL to add to playlist"
        type="text"
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            const element = event.target as HTMLInputElement
            const url = element.value

            if (validUrl(url)) {
              state.playlist?.push({ url })
              element.value = ''
            } else {
              // TODO: Replace with better inline error handling
              alert('Invalid URL')
            }
          }
        }}
        style={{ width: '200px', maxWidth: '100%' }}
      />
      <button onClick={handlePlayNext}>Play next</button>
    </div>
  )
}

export default Playlist
