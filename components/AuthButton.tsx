'use client'

import React, { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import Button from '@mui/joy/Button'
import Input from '@mui/joy/Input'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import DialogTitle from '@mui/joy/DialogTitle'
import DialogContent from '@mui/joy/DialogContent'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab from '@mui/joy/Tab'
import TabPanel from '@mui/joy/TabPanel'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import Snackbar from '@mui/joy/Snackbar'
import Alert from '@mui/joy/Alert'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import CreditCardIcon from '@mui/icons-material/CreditCard'

interface AuthButtonProps {
  user: User | null
  onAuthChange: (user: User | null) => void
}

const AuthButton: React.FC<AuthButtonProps> = ({ user, onAuthChange }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedTab, setSelectedTab] = useState<string | number>('signin')

  const [snackbar, setSnackbar] = useState({ open: false, message: '', color: 'success' as 'success' | 'danger' | 'warning' })

  const supabase = createClient()

  const showSnackbar = (message: string, color: 'success' | 'danger' | 'warning') => {
    setSnackbar({ open: true, message, color });
  };

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
        showSnackbar(error.message, 'danger')
        return
      }

      if (data.user) {
        onAuthChange(data.user)
        setIsDialogOpen(false)
        setEmail('')
        setPassword('')
        showSnackbar('Successfully signed in!', 'success')
      }
    } catch (error) {
      console.error('Sign in error:', error)
      showSnackbar('An error occurred during sign in', 'danger')
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
        showSnackbar(error.message, 'danger')
        return
      }

      if (data.user) {
        showSnackbar('Account created! Please check your email to verify your account.', 'success')
        setIsDialogOpen(false)
        setEmail('')
        setPassword('')
      }
    } catch (error) {
      console.error('Sign up error:', error)
      showSnackbar('An error occurred during sign up', 'danger')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        showSnackbar(error.message, 'danger')
        return
      }

      onAuthChange(null)
      showSnackbar('Successfully signed out!', 'success')
    } catch (error) {
      console.error('Sign out error:', error)
      showSnackbar('An error occurred during sign out', 'danger')
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
        showSnackbar('Failed to create checkout session', 'danger')
      }
    } catch (error) {
      console.error('Upgrade error:', error)
      showSnackbar('An error occurred during upgrade', 'danger')
    }
  }

  if (user) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography level="body-sm">Welcome, {user.email}</Typography>
        <Button
          startDecorator={<CreditCardIcon />}
          color="primary"
          onClick={handleUpgrade}
          size="sm"
        >
          Upgrade to Pro
        </Button>
        <Button
          startDecorator={<LogoutIcon />}
          onClick={handleSignOut}
          loading={isLoading}
          size="sm"
          variant="outlined"
        >
          Sign Out
        </Button>
      </Box>
    )
  }

  return (
    <>
      <Button
        startDecorator={<LoginIcon />}
        color="primary"
        onClick={() => setIsDialogOpen(true)}
      >
        Sign In
      </Button>

      <Modal open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <ModalDialog>
          <DialogTitle>Authentication</DialogTitle>
          <DialogContent>
            <Tabs
              value={selectedTab}
              onChange={(event, newValue) => {
                if (newValue !== null) {
                  setSelectedTab(newValue)
                }
              }}
            >
              <TabList>
                <Tab value="signin">Sign In</Tab>
                <Tab value="signup">Sign Up</Tab>
              </TabList>
              <TabPanel value="signin">
                <form onSubmit={handleSignIn}>
                  <FormControl required sx={{ mt: 2 }}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </FormControl>
                  <FormControl required sx={{ mt: 2 }}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    loading={isLoading}
                    color="primary"
                    fullWidth
                    sx={{ mt: 3 }}
                  >
                    Sign In
                  </Button>
                </form>
              </TabPanel>
              <TabPanel value="signup">
                <form onSubmit={handleSignUp}>
                <FormControl required sx={{ mt: 2 }}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </FormControl>
                  <FormControl required sx={{ mt: 2 }}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    loading={isLoading}
                    color="primary"
                    fullWidth
                    sx={{ mt: 3 }}
                  >
                    Sign Up
                  </Button>
                </form>
              </TabPanel>
            </Tabs>
          </DialogContent>
        </ModalDialog>
      </Modal>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        color={snackbar.color}
        variant="soft"
      >
        {snackbar.message}
      </Snackbar>
    </>
  )
}

export default AuthButton
