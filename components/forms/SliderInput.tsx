'use client'

import React, { useState } from 'react'
import Slider from '@mui/joy/Slider'
import Typography from '@mui/joy/Typography'

export interface SliderInputProps {
  label?: string
  min?: number
  max?: number
  step?: number
  value?: number
}

export const SliderInput: React.FC<SliderInputProps> = ({ label, min = 0, max = 100, step = 1, value = 50 }) => {
  const [val, setVal] = useState(value)
  return (
    <div>
      {label && <Typography level="body-sm" sx={{ mb: 0.5 }}>{label}: {val}</Typography>}
      <Slider min={min} max={max} step={step} value={val} onChange={(_, v) => typeof v === 'number' && setVal(v)} />
    </div>
  )
}


