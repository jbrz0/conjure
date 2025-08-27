'use client'

import React from 'react'
import Divider from '@mui/joy/Divider'

export interface DynamicDividerProps { inset?: boolean; text?: string }

export const DynamicDivider: React.FC<DynamicDividerProps> = ({ inset, text }) => {
  if (text) {
    return <Divider inset={inset ? 'context' : undefined}>{text}</Divider>
  }
  return <Divider inset={inset ? 'context' : undefined} />
}


