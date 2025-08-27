'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import Box from '@mui/joy/Box'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }) as any

export interface RichTextEditorProps { content?: string }

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ content = '' }) => {
  const [value, setValue] = useState(content)
  return (
    <Box sx={{ bgcolor: 'background.level1', borderRadius: 8 }}>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </Box>
  )
}


