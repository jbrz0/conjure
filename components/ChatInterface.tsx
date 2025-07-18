'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  InputGroup,
  Button,
  Card,
  Drawer,
  Intent,
  Toaster,
  Position,
  Spinner,
} from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Renderer } from './Renderer'
import { AIResponse, ChatMessage, UsageQuota } from '@/lib/types'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

interface ChatInterfaceProps {
  user: User | null
}

let toaster: Toaster | null = null;

const ChatInterface: React.FC<ChatInterfaceProps> = ({ user }) => {
  const getToaster = (): Toaster => {
    if (toaster === null) {
        toaster = Toaster.create({ position: Position.TOP });
    }
    return toaster;
  };

  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentResponse, setCurrentResponse] = useState<AIResponse | null>(null)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [quota, setQuota] = useState<UsageQuota | null>(null)
  const [anonymousCount, setAnonymousCount] = useState(0)
  
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
      getToaster().show({
        message: "You've reached the 10 message limit. Please sign up to continue.",
        intent: Intent.WARNING,
      })
      return
    }

    setIsLoading(true)
    setCurrentResponse(null) // Clear previous response

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: promptText }),
      })

      const data = await response.json()

      if (!data.success) {
        getToaster().show({
          message: data.error || 'Failed to generate response',
          intent: Intent.DANGER,
        })
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
      getToaster().show({
        message: 'Network error. Please try again.',
        intent: Intent.DANGER,
      })
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
    <div className="chat-interface">
      <div className="chat-container">
        <Card elevation={2} className="chat-card">
          {/* Current Response */}
          {currentResponse && (
            <div className="current-response">
              <Renderer response={currentResponse} onFormSubmit={handleFormSubmit} />
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="loading-state">
              <Spinner size={30} />
              <p className="bp5-text-muted">Generating response...</p>
            </div>
          )}

          {/* Prompt Input */}
          <form onSubmit={handleSubmit} className="prompt-form">
            <InputGroup
              inputRef={inputRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask me anything..."
              large
              fill
              disabled={isLoading}
              rightElement={
                <Button
                  type="submit"
                  icon={IconNames.SEND_MESSAGE}
                  minimal
                  disabled={!prompt.trim() || isLoading}
                />
              }
            />
          </form>

          {/* Quota Display */}
          {getQuotaDisplay() && (
            <div className="quota-display">
              <small className="bp5-text-muted">{getQuotaDisplay()}</small>
            </div>
          )}
        </Card>

        {/* History Button */}
        {user && (
          <Button
            icon={IconNames.HISTORY}
            text="History"
            onClick={() => setIsHistoryOpen(true)}
            className="history-button"
          />
        )}
      </div>

      {/* History Drawer */}
      <Drawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        title="Chat History"
        size="400px"
      >
        <div className="history-content">
          {chatHistory.length === 0 ? (
            <p className="bp5-text-muted">No chat history yet.</p>
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
        </div>
      </Drawer>
    </div>
  )
}

export default ChatInterface
