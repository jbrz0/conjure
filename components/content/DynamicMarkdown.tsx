'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Box from '@mui/joy/Box'

export interface DynamicMarkdownProps {
  content: string
}

export const DynamicMarkdown: React.FC<DynamicMarkdownProps> = ({ content }) => {
  return (
    <Box sx={{ p: 1 }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </Box>
  )
}


