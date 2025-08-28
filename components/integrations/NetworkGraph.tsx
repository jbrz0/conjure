'use client'

import React from 'react'
import { Graph } from '@visx/network'

export interface NetworkGraphProps {
  nodes: { id: string }[]
  links: { source: string; target: string }[]
}

export const NetworkGraph: React.FC<NetworkGraphProps> = ({ nodes, links }) => {
  // visx network expects node objects referenced by link.source/link.target
  const nodeObjects = nodes.map((n) => ({ id: n.id }))
  const nodeIndex: Record<string, any> = Object.fromEntries(nodeObjects.map((n) => [n.id, n]))
  const linkObjects = links
    .filter((l) => nodeIndex[l.source] && nodeIndex[l.target])
    .map((l) => ({ source: nodeIndex[l.source], target: nodeIndex[l.target] }))
  const data = { nodes: nodeObjects, links: linkObjects } as any
  return (
    <svg width={500} height={300}>
      <Graph
        graph={data}
        nodeComponent={({ node }) => <circle r={6} fill="#4dabf7" />}
        linkComponent={({ link }) => <line stroke="#74c0fc" />}
      />
    </svg>
  )
}


