'use client'

import React, { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import ChatInterface from '@/components/ChatInterface'
import AuthButton from '@/components/AuthButton'
import CircularProgress from '@mui/joy/CircularProgress';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size="lg" />
      </Box>
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
        <Typography level="body-sm" sx={{ color: 'text.tertiary' }}>
          Powered by AI • Built with Next.js & Supabase
        </Typography>
      </footer>
    </main>
  )
}
