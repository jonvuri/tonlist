'use client'

import React, { useEffect, useState } from 'react'
import { useSyncedStore } from '@syncedstore/react'

import YoutubeControl from './components/YoutubeControl'
import { store } from './store'

import styles from './page.module.css'

export default function Home() {
  // The store will load the initial state faster than the first render,
  // so React will complain the first client render doesn't match the server's
  // render. We mount it after the first render with an effect to avoid this.
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const state = useSyncedStore(store)

  return (
    mounted && (
      <main className={styles.main}>
        <div className={styles.description}>
          <p>Player:</p>
        </div>

        <div className={styles.center}>
          <YoutubeControl />
        </div>

        <div>
          <p>Todo items:</p>
          <ul>
            {state.todos.map((todo, i) => {
              return (
                <li
                  key={i}
                  style={{
                    textDecoration: todo.completed ? 'line-through' : '',
                  }}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={(event) => {
                        todo.completed = event.target.checked
                      }}
                    />
                    {todo.title}
                  </label>
                </li>
              )
            })}
          </ul>
          <input
            placeholder="Enter a todo item and hit enter"
            type="text"
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                const target = event.target as HTMLInputElement
                // Add a todo item using the text added in the textfield
                state.todos.push({ completed: false, title: target.value })
                target.value = ''
              }
            }}
            style={{ width: '200px', maxWidth: '100%' }}
          />
        </div>
      </main>
    )
  )
}
