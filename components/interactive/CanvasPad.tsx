'use client'

import React, { useRef, useEffect, useState } from 'react'

export interface CanvasPadProps { width?: number; height?: number }

export const CanvasPad: React.FC<CanvasPadProps> = ({ width = 400, height = 240 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [drawing, setDrawing] = useState(false)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    ctx.lineWidth = 2
    const onDown = (e: MouseEvent) => { setDrawing(true); ctx.beginPath(); ctx.moveTo(e.offsetX, e.offsetY) }
    const onMove = (e: MouseEvent) => { if (!drawing) return; ctx.lineTo(e.offsetX, e.offsetY); ctx.stroke() }
    const onUp = () => setDrawing(false)
    canvas.addEventListener('mousedown', onDown)
    canvas.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => { canvas.removeEventListener('mousedown', onDown); canvas.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [drawing])
  return <canvas ref={canvasRef} width={width} height={height} style={{ borderRadius: 8, background: '#fff' }} />
}


