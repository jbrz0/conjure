'use client'

import React, { useState } from 'react'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

export interface TreeNode { name: string; value?: number; children?: TreeNode[] }
export interface CollapsibleTreeProps { root: TreeNode }

const NodeView: React.FC<{ node: TreeNode; depth: number }> = ({ node, depth }) => {
  const [open, setOpen] = useState(true)
  const hasChildren = !!node.children && node.children.length > 0
  return (
    <Box sx={{ pl: depth * 1.2 }}>
      <Typography level="body-sm" onClick={() => setOpen((o) => !o)} sx={{ cursor: hasChildren ? 'pointer' : 'default' }}>
        {hasChildren ? (open ? '▼ ' : '▶ ') : ''}
        {node.name}{node.value !== undefined ? ` (${node.value})` : ''}
      </Typography>
      {open && node.children?.map((c, i) => <NodeView key={i} node={c} depth={depth + 1} />)}
    </Box>
  )
}

export const CollapsibleTree: React.FC<CollapsibleTreeProps> = ({ root }) => {
  return <NodeView node={root} depth={0} />
}


