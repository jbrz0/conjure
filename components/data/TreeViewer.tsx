'use client'

import React from 'react'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

export interface TreeNode { name: string; value?: number; children?: TreeNode[] }
export interface TreeViewerProps { root: TreeNode }

const renderNode = (node: TreeNode, depth = 0): React.ReactNode => {
  return (
    <Box key={`${node.name}-${depth}`} sx={{ pl: depth * 1.5 }}>
      <Typography level="body-sm">{node.name}{node.value !== undefined ? ` (${node.value})` : ''}</Typography>
      {node.children?.map((c) => renderNode(c, depth + 1))}
    </Box>
  )
}

export const TreeViewer: React.FC<TreeViewerProps> = ({ root }) => {
  return <Box>{renderNode(root)}</Box>
}


