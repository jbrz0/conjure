'use client'

import React, { useState } from 'react'
import {
  Button,
  Dialog,
  FormGroup,
  InputGroup,
  Intent,
  Toaster,
  Position,
  Tabs,
  Tab,
} from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

interface AuthButtonProps {
  user: User | null
  onAuthChange: (user: User | null) => void
}

let toaster: Toaster | null = null;

const AuthButton: React.FC<AuthButtonProps> = ({ user, onAuthChange }) => {
  const getToaster = (): Toaster => {
    if (toaster === null) {
        toaster = Toaster.create({ position: Position.TOP });
    }
    return toaster;
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedTab, setSelectedTab] = useState<'signin' | 'signup'>('signin')
  
  const supabase = createClient()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return

    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        getToaster().show({
          message: error.message,
          intent: Intent.DANGER,
        })
        return
      }

      if (data.user) {
        onAuthChange(data.user)
        setIsDialogOpen(false)
        setEmail('')
        setPassword('')
        getToaster().show({
          message: 'Successfully signed in!',
          intent: Intent.SUCCESS,
        })
      }
    } catch (error) {
      console.error('Sign in error:', error)
      getToaster().show({
        message: 'An error occurred during sign in',
        intent: Intent.DANGER,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return

    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        getToaster().show({
          message: error.message,
          intent: Intent.DANGER,
        })
        return
      }

      if (data.user) {
        getToaster().show({
          message: 'Account created! Please check your email to verify your account.',
          intent: Intent.SUCCESS,
        })
        setIsDialogOpen(false)
        setEmail('')
        setPassword('')
      }
    } catch (error) {
      console.error('Sign up error:', error)
      getToaster().show({
        message: 'An error occurred during sign up',
        intent: Intent.DANGER,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        getToaster().show({
          message: error.message,
          intent: Intent.DANGER,
        })
        return
      }

      onAuthChange(null)
      getToaster().show({
        message: 'Successfully signed out!',
        intent: Intent.SUCCESS,
      })
    } catch (error) {
      console.error('Sign out error:', error)
      getToaster().show({
        message: 'An error occurred during sign out',
        intent: Intent.DANGER,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpgrade = async () => {
    if (!user) return

    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      if (data.success && data.url) {
        window.location.href = data.url
      } else {
        getToaster().show({
          message: 'Failed to create checkout session',
          intent: Intent.DANGER,
        })
      }
    } catch (error) {
      console.error('Upgrade error:', error)
      getToaster().show({
        message: 'An error occurred during upgrade',
        intent: Intent.DANGER,
      })
    }
  }

  if (user) {
    return (
      <div className="auth-section">
        <div className="user-info">
          <span className="bp5-text-muted">Welcome, {user.email}</span>
        </div>
        <div className="auth-buttons">
          <Button
            icon={IconNames.CREDIT_CARD}
            text="Upgrade to Pro"
            intent={Intent.PRIMARY}
            onClick={handleUpgrade}
            small
          />
          <Button
            icon={IconNames.LOG_OUT}
            text="Sign Out"
            onClick={handleSignOut}
            loading={isLoading}
            small
          />
        </div>
      </div>
    )
  }

  return (
    <>
      <Button
        icon={IconNames.LOG_IN}
        text="Sign In"
        intent={Intent.PRIMARY}
        onClick={() => setIsDialogOpen(true)}
      />

      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Authentication"
        className="auth-dialog"
      >
        <div className="bp5-dialog-body">
          <Tabs
            selectedTabId={selectedTab}
            onChange={(tabId) => setSelectedTab(tabId as 'signin' | 'signup')}
          >
            <Tab
              id="signin"
              title="Sign In"
              panel={
                <form onSubmit={handleSignIn}>
                  <FormGroup label="Email" labelFor="signin-email">
                    <InputGroup
                      id="signin-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </FormGroup>
                  <FormGroup label="Password" labelFor="signin-password">
                    <InputGroup
                      id="signin-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  </FormGroup>
                  <div className="auth-form-actions">
                    <Button
                      type="submit"
                      intent={Intent.PRIMARY}
                      loading={isLoading}
                      text="Sign In"
                    />
                  </div>
                </form>
              }
            />
            <Tab
              id="signup"
              title="Sign Up"
              panel={
                <form onSubmit={handleSignUp}>
                  <FormGroup label="Email" labelFor="signup-email">
                    <InputGroup
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </FormGroup>
                  <FormGroup label="Password" labelFor="signup-password">
                    <InputGroup
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      required
                    />
                  </FormGroup>
                  <div className="auth-form-actions">
                    <Button
                      type="submit"
                      intent={Intent.PRIMARY}
                      loading={isLoading}
                      text="Sign Up"
                    />
                  </div>
                </form>
              }
            />
          </Tabs>
        </div>
      </Dialog>
    </>
  )
}

export default AuthButton
