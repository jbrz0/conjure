'use client'

import React, { useRef } from 'react'
import Button from '@mui/joy/Button'
import Typography from '@mui/joy/Typography'

export interface UploadInputProps { label?: string; accept?: string }

export const UploadInput: React.FC<UploadInputProps> = ({ label = 'Upload file', accept }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div>
      <input ref={inputRef} type="file" accept={accept} style={{ display: 'none' }} />
      <Button onClick={() => inputRef.current?.click()}>{label}</Button>
      <Typography level="body-xs" sx={{ ml: 1, display: 'inline-block' }}>No upload performed (demo)</Typography>
    </div>
  )
}


