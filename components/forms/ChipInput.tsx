'use client'

import React, { useState } from 'react'
import Chip from '@mui/joy/Chip'
import ChipDelete from '@mui/joy/ChipDelete'
import Input from '@mui/joy/Input'
import Box from '@mui/joy/Box'

export interface ChipInputProps { label?: string; values?: string[] }

export const ChipInput: React.FC<ChipInputProps> = ({ values = [] }) => {
  const [chips, setChips] = useState<string[]>(values)
  const [text, setText] = useState('')
  const add = () => {
    if (!text.trim()) return
    setChips((p) => [...p, text.trim()])
    setText('')
  }
  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {chips.map((c, idx) => (
        <Chip key={idx} variant="soft" endDecorator={<ChipDelete onDelete={() => setChips(chips.filter((x) => x !== c))} />}>{c}</Chip>
      ))}
      <Input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} placeholder="Add tag" />
    </Box>
  )
}


