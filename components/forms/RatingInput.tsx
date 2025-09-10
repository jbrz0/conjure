'use client'

import React, { useState } from 'react'
import Rating from '@mui/material/Rating'
import Typography from '@mui/joy/Typography'

export interface RatingInputProps { label?: string; value?: number; max?: number }

export const RatingInput: React.FC<RatingInputProps> = ({ label, value = 3, max = 5 }) => {
  const [val, setVal] = useState<number | null>(value)
  return (
    <div>
      {label && <Typography level="body-sm" sx={{ mb: 0.5 }}>{label}</Typography>}
      <Rating
        value={val}
        max={max}
        onChange={(
          _event: React.SyntheticEvent<Element, Event>,
          value: number | null
        ) => setVal(value)}
      />
    </div>
  )
}


