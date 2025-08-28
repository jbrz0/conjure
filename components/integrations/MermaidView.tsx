'use client'

import React, { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Typography from '@mui/joy/Typography'

export interface MermaidViewProps { code: string }

export const MermaidView: React.FC<MermaidViewProps> = ({ code }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [showCode, setShowCode] = useState(false)
  useEffect(() => {
    mermaid.initialize({ startOnLoad: false })
    if (ref.current) {
      mermaid.render(`m-${Math.random().toString(36).slice(2)}`, code).then(({ svg }) => {
        ref.current!.innerHTML = svg
      })
    }
  }, [code])
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <div ref={ref} />
      <Box>
        <Button size="sm" variant="outlined" onClick={() => setShowCode((s) => !s)}>
          {showCode ? 'Hide mermaid code' : 'Show mermaid code'}
        </Button>
      </Box>
      {showCode && (
        <Box sx={{ mt: 1, p: 1.5, borderRadius: '8px', backgroundColor: 'background.level2', border: '1px solid', borderColor: 'neutral.outlinedBorder' }}>
          <Typography level="body-xs" sx={{ mb: 0.5 }}>graph TD</Typography>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{code}</pre>
        </Box>
      )}
    </Box>
  )
}


