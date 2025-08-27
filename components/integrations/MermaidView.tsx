'use client'

import React, { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

export interface MermaidViewProps { code: string }

export const MermaidView: React.FC<MermaidViewProps> = ({ code }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    mermaid.initialize({ startOnLoad: false })
    if (ref.current) {
      mermaid.render(`m-${Math.random().toString(36).slice(2)}`, code).then(({ svg }) => {
        ref.current!.innerHTML = svg
      })
    }
  }, [code])
  return <div ref={ref} />
}


