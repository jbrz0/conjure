'use client'

import React, { useState, useEffect } from 'react'
import Snackbar from '@mui/joy/Snackbar'

export interface SnackbarViewProps { message: string; color?: 'success' | 'danger' | 'warning' | 'neutral' }

export const SnackbarView: React.FC<SnackbarViewProps> = ({ message, color = 'neutral' }) => {
  const [open, setOpen] = useState(false)
  useEffect(() => { setOpen(true) }, [message])
  return (
    <Snackbar open={open} onClose={() => setOpen(false)} color={color} autoHideDuration={4000}>
      {message}
    </Snackbar>
  )
}


