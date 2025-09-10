'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Graph } from '@visx/network'

export interface NetworkGraphProps {
  nodes: { id: string }[]
  links: { source: string; target: string }[]
  width?: number
  height?: number
  responsive?: boolean
  aspectRatio?: number // width / height, used when responsive
}

export const NetworkGraph: React.FC<NetworkGraphProps> = ({ nodes, links, width, height, responsive = true, aspectRatio = 16/9 }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<{ w: number; h: number }>(() => {
    const w = width || 600
    const h = height || Math.round(w / aspectRatio)
    return { w, h }
  })

  useEffect(() => {
    if (!responsive) return
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.max(240, Math.floor(entry.contentRect.width))
        const h = Math.max(200, Math.floor(w / aspectRatio))
        setSize({ w, h })
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [responsive, aspectRatio])

  const dims = {
    w: responsive ? size.w : (width || 600),
    h: responsive ? size.h : (height || Math.round((width || 600) / aspectRatio)),
  }

  // Layout nodes on a circle for a simple, readable default
  const { nodeObjects, linkObjects } = useMemo(() => {
    const radius = Math.max(40, Math.min(dims.w, dims.h) / 2 - 20)
    const centerX = dims.w / 2
    const centerY = dims.h / 2

    const laidOutNodes = nodes.map((n, idx) => {
      const angle = (idx / Math.max(1, nodes.length)) * Math.PI * 2
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)
      return { id: n.id, x, y }
    })

    const index: Record<string, any> = Object.fromEntries(laidOutNodes.map((n) => [n.id, n]))
    const laidOutLinks = links
      .filter((l) => index[l.source] && index[l.target])
      .map((l) => ({ source: index[l.source], target: index[l.target] }))

    return { nodeObjects: laidOutNodes, linkObjects: laidOutLinks }
  }, [nodes, links, dims.w, dims.h])

  const data = { nodes: nodeObjects, links: linkObjects } as any

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <svg width="100%" height={dims.h} viewBox={`0 0 ${dims.w} ${dims.h}`} preserveAspectRatio="xMidYMid meet">
        <Graph
          graph={data}
          nodeComponent={() => <circle r={6} fill="#4dabf7" />}
          linkComponent={({ link }) => (
            <line x1={link.source.x} y1={link.source.y} x2={link.target.x} y2={link.target.y} stroke="#74c0fc" />
          )}
        />
      </svg>
    </div>
  )
}


