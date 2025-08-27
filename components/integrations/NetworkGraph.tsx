'use client'

import React from 'react'
import { Graph } from '@visx/network'

export interface NetworkGraphProps {
  nodes: { id: string }[]
  links: { source: string; target: string }[]
}

export const NetworkGraph: React.FC<NetworkGraphProps> = ({ nodes, links }) => {
  const data = {
    nodes: nodes.map((n) => ({ id: n.id })),
    links: links.map((l) => ({ source: l.source, target: l.target })),
  } as any
  return (
    <svg width={500} height={300}>
      <Graph graph={data} nodeComponent={({ node }) => (
        <circle r={6} fill="#4dabf7" />
      )} linkComponent={({ link }) => (
        <line stroke="#74c0fc" />
      )} />
    </svg>
  )
}


