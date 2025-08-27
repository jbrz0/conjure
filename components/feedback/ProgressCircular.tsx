'use client'

import React from 'react'
import CircularProgress from '@mui/joy/CircularProgress'

export interface ProgressCircularProps { value?: number }

export const ProgressCircular: React.FC<ProgressCircularProps> = ({ value }) => {
  if (value === undefined) return <CircularProgress />
  return <CircularProgress determinate value={value} />
}


