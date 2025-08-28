'use client'

import React, { useState, useRef, useEffect } from 'react'
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CircularProgress from '@mui/joy/CircularProgress';
import Drawer from '@mui/joy/Drawer';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import SendIcon from '@mui/icons-material/Send';
import HistoryIcon from '@mui/icons-material/History';
import { Renderer } from './Renderer'
import { AIResponse, ChatMessage, UsageQuota } from '@/lib/types'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import ComponentPicker from './ComponentPicker'

interface ChatInterfaceProps {
  user: User | null
}


const ChatInterface: React.FC<ChatInterfaceProps> = ({ user }) => {

  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentResponse, setCurrentResponse] = useState<AIResponse | null>(null)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [quota, setQuota] = useState<UsageQuota | null>(null)
  const [anonymousCount, setAnonymousCount] = useState(0)
  const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'info' | 'warning' | 'error' } | null>(null)
  const [forcedKind, setForcedKind] = useState<string | null>(null)
  const [forceWebSearch, setForceWebSearch] = useState<boolean>(false)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  // Load anonymous usage count from localStorage
  useEffect(() => {
    if (!user) {
      const count = parseInt(localStorage.getItem('conjure_anonymous_count') || '0')
      setAnonymousCount(count)
    }
  }, [user])

  // Load chat history
  useEffect(() => {
    loadChatHistory()
  }, [user])

  const loadChatHistory = async () => {
    if (!user) return

    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      console.error('Error loading chat history:', error)
      return
    }

    setChatHistory(data || [])
  }

  const sendPrompt = async (promptText: string) => {
    if (!promptText.trim() || isLoading) return

    // Check quota for anonymous users
    if (!user && anonymousCount >= 10) {
      setToast({ open: true, message: "You've reached the 10 message limit. Please sign up to continue.", severity: 'warning' })
      return
    }

    setIsLoading(true)
    setCurrentResponse(null) // Clear previous response

    try {
      const steering = forcedKind ? `\n\nFORCE_COMPONENT: ${forcedKind}\n` : ''
      const finalPrompt = steering ? `${promptText}${steering}` : promptText
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: finalPrompt, forceWebSearch }),
      })

      const data = await response.json()

      if (!data.success) {
        setToast({ open: true, message: data.error || 'Failed to generate response', severity: 'error' })
        return
      }

      setCurrentResponse(data.data)
      if (data.quota) {
        setQuota(data.quota)
      }

      // Update anonymous count
      if (!user) {
        const newCount = anonymousCount + 1
        setAnonymousCount(newCount)
        localStorage.setItem('conjure_anonymous_count', newCount.toString())
      } else {
        loadChatHistory()
      }
    } catch (error) {
      console.error('Chat error:', error)
      setToast({ open: true, message: 'Network error. Please try again.', severity: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const currentPrompt = prompt
    setPrompt('')
    await sendPrompt(currentPrompt)
  }

  const handleFormSubmit = (formData: Record<string, string>) => {
    const formattedData = Object.entries(formData)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ')
    const newPrompt = `Form submitted with data: ${formattedData}`
    sendPrompt(newPrompt)
  }

  const getQuotaDisplay = () => {
    if (!user) {
      return `${anonymousCount}/10 messages (anonymous)`
    }
    if (quota) {
      return `${quota.used}/${quota.limit} messages this period`
    }
    return null
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', maxWidth: '800px', margin: 'auto' }}>
        <Card variant="outlined" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
          {/* Current Response */}
          {currentResponse && (
            <div className="current-response">
              <Renderer response={currentResponse} onFormSubmit={handleFormSubmit} />
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 2 }}>
              <CircularProgress size="md" />
              <Typography level="body-sm" sx={{ mt: 1 }}>Generating response...</Typography>
            </Box>
          )}

          {/* Component Picker */}
          <ComponentPicker
            selected={forcedKind}
            onChange={setForcedKind}
            onToggleSearch={setForceWebSearch}
            forceWebSearch={forceWebSearch}
          />

          {/* Prompt Input */}
          <form onSubmit={handleSubmit} style={{ marginTop: 'auto' }}>
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask me anything..."
              disabled={isLoading}
              endDecorator={
                <Button
                  type="submit"
                  disabled={!prompt.trim() || isLoading}
                  loading={isLoading}
                >
                  <SendIcon />
                </Button>
              }
              sx={{
                mt: 2,
                fontSize: '1.05rem',
                '--Input-minHeight': '56px',
                backgroundColor: 'background.level1',
                borderRadius: '14px',
                border: '1px solid',
                borderColor: 'neutral.outlinedBorder',
                boxShadow: '0 0 0 2px rgba(0,213,245,0.15), 0 0 24px rgba(0,213,245,0.08)',
                '&:focus-within': {
                  boxShadow: '0 0 0 2px rgba(15,225,255,0.35), 0 0 28px rgba(15,225,255,0.18)',
                  borderColor: 'primary.solidBg',
                },
              }}
            />
          </form>

          {/* Quota Display */}
          {getQuotaDisplay() && (
            <Typography level="body-xs" sx={{ textAlign: 'center', mt: 1, color: 'text.tertiary' }}>
              {getQuotaDisplay()}
            </Typography>
          )}
        </Card>

        {user && (
          <Button
            startDecorator={<HistoryIcon />}
            onClick={() => setIsHistoryOpen(true)}
            variant="outlined"
            sx={{ mt: 2, alignSelf: 'center' }}
          >
            History
          </Button>
        )}

      {/* History Drawer */}
      <Drawer
        open={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        anchor="right"
      >
        <Box sx={{ width: 400, p: 2 }}>
          <Typography level="h4" component="h2" sx={{ mb: 2 }}>Chat History</Typography>
          {chatHistory.length === 0 ? (
            <Typography>No chat history yet.</Typography>
          ) : (
            <div className="history-timeline">
              {chatHistory.map((message) => (
                <div
                  key={message.id}
                  className="history-item"
                >
                  <div className="history-prompt">
                    <strong>You:</strong> {message.prompt}
                  </div>
                  <div className="history-response">
                    <strong>Conjure:</strong> {message.response.topline}
                  </div>
                  <div className="history-time">
                    {new Date(message.created_at).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Box>
      </Drawer>

      {toast && (
        <Snackbar
          open={toast.open}
          autoHideDuration={6000}
          onClose={() => setToast(prev => prev ? { ...prev, open: false } : null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setToast(prev => prev ? { ...prev, open: false } : null)} severity={toast.severity} sx={{ width: '100%' }}>
            {toast.message}
          </Alert>
        </Snackbar>
      )}
    </Box>
  )
}

export default ChatInterface
