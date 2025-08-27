'use client'

import React, { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

export interface ColorPickerProps { label?: string; value?: string }

export const ColorPicker: React.FC<ColorPickerProps> = ({ label = 'Color', value = '#4dabf7' }) => {
  const [val, setVal] = useState(value)
  return (
    <Box>
      <Typography level="body-sm" sx={{ mb: 1 }}>{label}: {val}</Typography>
      <HexColorPicker color={val} onChange={setVal} />
    </Box>
  )
}


