'use client'

import React, { useEffect, useRef } from 'react'

export interface GistEmbedProps { gistId: string }

export const GistEmbed: React.FC<GistEmbedProps> = ({ gistId }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!ref.current) return
    const script = document.createElement('script')
    script.src = `https://gist.github.com/${gistId}.js`
    script.async = true
    ref.current.innerHTML = ''
    ref.current.appendChild(script)
  }, [gistId])
  return <div ref={ref} />
}


