'use client'

import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { duotoneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Box from '@mui/joy/Box'

export interface DynamicCodeProps {
  code: string
  language?: string
}

export const DynamicCode: React.FC<DynamicCodeProps> = ({ code, language }) => {
  return (
    <Box sx={{ p: 1 }}>
      <SyntaxHighlighter language={language ?? 'tsx'} style={duotoneDark} customStyle={{ borderRadius: 8 }}>
        {code}
      </SyntaxHighlighter>
    </Box>
  )
}


