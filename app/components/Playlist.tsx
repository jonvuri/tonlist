'use client'

import React from 'react'
import { Button, Heading, Section, TextInput, Tile } from '@carbon/react'
import {
  Checkmark,
  Copy,
  Delete,
  Edit,
  SkipForwardFilled,
} from '@carbon/icons-react'
import { useSyncedStore } from '@syncedstore/react'

import { Store, PlaylistEntry } from '@/app/store'

import styles from './Playlist.module.sass'
import PlayHistory from './PlayHistory'

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

  return (
    <div className={styles['playlist-entry-row']}>
      {editing ? (
        <>
          <TextInput
            id="url-edit-input"
            labelText="Enter new URL"
            placeholder="Enter URL here"
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
          <Button onClick={saveChanges} disabled={!validUrl(editedUrl)}>
            Save
          </Button>
        </>
      ) : (
        <>
          <div style={{ marginRight: '1rem' }}>{entry.url}</div>
          <Button
            renderIcon={Edit}
            iconDescription="Edit"
            kind="ghost"
            hasIconOnly
            className={styles['playlist-entry-button']}
            onClick={() => setEditing(true)}
          />
          <Button
            renderIcon={Delete}
            iconDescription="Remove"
            kind="ghost"
            hasIconOnly
            className={styles['playlist-entry-button']}
            onClick={onRemove}
          />
        </>
      )}
    </div>
  )
}

type Props = {
  store: Store
}

const Playlist = ({ store }: Props) => {
  const state = useSyncedStore(store)

  const [showCopySuccess, setShowCopySuccess] = React.useState(false)

  const handleCopyRoomUrl = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setShowCopySuccess(true)
    setTimeout(() => {
      setShowCopySuccess(false)
    }, 4000)
  }

  const handlePlayNext = () => {
    if (!state.playlist?.length) return

    // Store the current entry in the play history
    if (state.player_state.playing_url) {
      state.play_history?.push({
        url: state.player_state.playing_url,
      })
    }

    // Update the player state to play the next entry in playlist
    state.player_state.playing_url = state.playlist[0].url
    state.player_state.playing_start_time = Date.now()

    // Remove the next entry from the playlist
    state.playlist.splice(0, 1)
  }

  return (
    <Section className={styles['playlist-container']}>
      <PlayHistory store={store} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Heading style={{ marginBottom: '1rem' }}>Now playing</Heading>
        <div style={{ alignSelf: 'center' }}>
          <Button
            renderIcon={showCopySuccess ? Checkmark : Copy}
            onClick={handleCopyRoomUrl}
          >
            {showCopySuccess ? 'Copied!' : 'Copy room URL'}
          </Button>
        </div>
      </div>
      <Tile style={{ display: 'flex', alignItems: 'center' }}>
        {state.player_state?.playing_url}
      </Tile>
      <div style={{ display: 'flex' }}>
        <Heading style={{ flex: '1', margin: '1rem 0' }}>Next up</Heading>
        <div style={{ alignSelf: 'center' }}>
          <Button
            onClick={handlePlayNext}
            size="sm"
            renderIcon={SkipForwardFilled}
          >
            Play next
          </Button>
        </div>
      </div>
      <ul className={styles['playlist-next-up-container']}>
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
      <div>
        <TextInput
          id="url-input"
          labelText="Enter a video URL to add to the playlist"
          placeholder="Enter URL here"
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
        />
      </div>
    </Section>
  )
}

export default Playlist
