'use client'

import React, { useState } from 'react'
import Drawer from '@mui/joy/Drawer'
import Button from '@mui/joy/Button'
import Box from '@mui/joy/Box'

export interface DrawerSheetProps { side?: 'left' | 'right' | 'top' | 'bottom'; content: string }

export const DrawerSheet: React.FC<DrawerSheetProps> = ({ side = 'right', content }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer anchor={side} open={open} onClose={() => setOpen(false)}>
        <Box sx={{ p: 2, width: 320 }}>{content}</Box>
      </Drawer>
    </>
  )
}


