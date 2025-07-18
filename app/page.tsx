'use client'

import React, { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import ChatInterface from '@/components/ChatInterface'
import AuthButton from '@/components/AuthButton'

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  
  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="bp5-spinner bp5-large">
          <svg viewBox="0 0 100 100">
            <path
              className="bp5-spinner-track"
              d="M 50,50 m 0,-44.5 a 44.5,44.5 0 1 1 0,89 a 44.5,44.5 0 1 1 0,-89"
            />
            <path
              className="bp5-spinner-head"
              d="M 50,50 m 0,-44.5 a 44.5,44.5 0 1 1 0,89 a 44.5,44.5 0 1 1 0,-89"
            />
          </svg>
        </div>
      </div>
    )
  }

  return (
    <main className="main-container">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Conjure</h1>
          <AuthButton user={user} onAuthChange={setUser} />
        </div>
      </header>

      <div className="app-content">
        <ChatInterface user={user} />
      </div>

      <footer className="app-footer">
        <p className="bp5-text-muted">
          Powered by AI • Built with Next.js & Supabase
        </p>
      </footer>
    </main>
  )
}
