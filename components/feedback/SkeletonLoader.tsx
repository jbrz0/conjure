'use client'

import React from 'react'
import Skeleton from '@mui/joy/Skeleton'

export interface SkeletonLoaderProps { width?: number; height?: number }

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ width = 200, height = 24 }) => {
  return <Skeleton variant="rectangular" width={width} height={height} />
}


