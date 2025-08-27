'use client'

import React, { useState } from 'react'
import Switch from '@mui/joy/Switch'
import Typography from '@mui/joy/Typography'

export interface SwitchInputProps { label: string; checked?: boolean }

export const SwitchInput: React.FC<SwitchInputProps> = ({ label, checked }) => {
  const [on, setOn] = useState(!!checked)
  return (
    <div>
      <Switch checked={on} onChange={(e) => setOn(e.target.checked)} />
      <Typography level="body-sm" sx={{ ml: 1, display: 'inline-block' }}>{label}: {on ? 'On' : 'Off'}</Typography>
    </div>
  )
}


