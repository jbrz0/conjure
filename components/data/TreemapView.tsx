'use client'

import React from 'react'
import { Treemap, hierarchy } from '@visx/hierarchy'

export interface TreeNode { name: string; value?: number; children?: TreeNode[] }
export interface TreemapViewProps { root: TreeNode; width?: number; height?: number }

export const TreemapView: React.FC<TreemapViewProps> = ({ root, width = 400, height = 240 }) => {
  const data = hierarchy(root).sum((d: any) => d.value || 0)
  return (
    <svg width={width} height={height}>
      <Treemap root={data} size={[width, height]} round>
        {(treemap) => (
          <g>
            {treemap.leaves().map((leaf, i) => (
              <rect key={i} x={leaf.x0} y={leaf.y0} width={leaf.x1 - leaf.x0} height={leaf.y1 - leaf.y0} fill="#4dabf7" />
            ))}
          </g>
        )}
      </Treemap>
    </svg>
  )
}


