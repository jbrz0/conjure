'use client'

import React, { useState } from 'react'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import DialogTitle from '@mui/joy/DialogTitle'
import DialogContent from '@mui/joy/DialogContent'
import Button from '@mui/joy/Button'

export interface ModalDialogViewProps { title?: string; content: string }

export const ModalDialogView: React.FC<ModalDialogViewProps> = ({ title, content }) => {
  const [open, setOpen] = useState(true)
  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outlined">Open Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          {title && <DialogTitle>{title}</DialogTitle>}
          <DialogContent>{content}</DialogContent>
        </ModalDialog>
      </Modal>
    </>
  )
}


