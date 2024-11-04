'use client'

import React from 'react'
import { Heading, Section } from '@carbon/react'
import { useSyncedStore } from '@syncedstore/react'

import { Store, PlaylistEntry } from '@/app/store'

import styles from './Playlist.module.sass'

type PlaylistEntryRowProps = {
  entry: PlaylistEntry
}

const PlaylistEntryRow = ({ entry }: PlaylistEntryRowProps) => {
  return <div className={styles['playlist-entry-row']}>{entry.url}</div>
}

type Props = {
  store: Store
}

const PlayHistory = ({ store }: Props) => {
  const state = useSyncedStore(store)

  return (
    <Section className={styles['playlist-container']}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Heading style={{ marginBottom: '1rem' }}>Play history</Heading>
      </div>
      <ul className={styles['playlist-next-up-container']}>
        {state.play_history?.map((entry, index) => (
          <li key={index}>
            <PlaylistEntryRow entry={entry} />
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default PlayHistory
