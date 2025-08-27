'use client'

import React from 'react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'

export interface JsonViewerProps { data: unknown }

export const JsonViewer: React.FC<JsonViewerProps> = ({ data }) => {
  const theme = useTheme()
  // Simple collapsible JSON via <details>
  const pretty = JSON.stringify(data, null, 2)
  return (
    <Box sx={{ p: 1, bgcolor: theme.vars.palette.neutral.softBg, borderRadius: 6 }}>
      <details open>
        <summary>JSON</summary>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{pretty}</pre>
      </details>
    </Box>
  )
}


