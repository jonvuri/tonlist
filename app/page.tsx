'use client'

import React, { useEffect, useState } from 'react'
import { Content, Grid, Column } from '@carbon/react'

import MediaContainer from '@/app/components/MediaContainer'
import Playlist from '@/app/components/Playlist'
import { useStore } from './store'

import styles from './page.module.sass'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true) // Ensures the component mounts after the first render
  }, [])

  const store = useStore()

  return (
    mounted && (
      <Content className={styles['full-height']}>
        <Grid className={styles['full-height']}>
          {store ? (
            <>
              <Column lg={10} className={styles['full-height']}>
                <MediaContainer store={store} />
              </Column>
              <Column lg={6} className={styles['full-height']}>
                <Playlist store={store} />
              </Column>
            </>
          ) : (
            'Loading...'
          )}
        </Grid>
      </Content>
    )
  )
}
