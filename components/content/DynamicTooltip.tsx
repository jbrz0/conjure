'use client'

import React from 'react'
import Tooltip from '@mui/joy/Tooltip'
import Button from '@mui/joy/Button'

export interface DynamicTooltipProps { label: string; text: string }

export const DynamicTooltip: React.FC<DynamicTooltipProps> = ({ label, text }) => {
  return (
    <Tooltip title={text} variant="outlined">
      <Button variant="plain">{label}</Button>
    </Tooltip>
  )
}


