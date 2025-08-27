'use client'

import React, { useRef, useEffect } from 'react'

export interface SignaturePadViewProps { width?: number; height?: number }

export const SignaturePadView: React.FC<SignaturePadViewProps> = ({ width = 400, height = 160 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    ctx.lineWidth = 3
    let drawing = false
    const onDown = (e: MouseEvent) => { drawing = true; ctx.beginPath(); ctx.moveTo(e.offsetX, e.offsetY) }
    const onMove = (e: MouseEvent) => { if (!drawing) return; ctx.lineTo(e.offsetX, e.offsetY); ctx.stroke() }
    const onUp = () => { drawing = false }
    canvas.addEventListener('mousedown', onDown)
    canvas.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => { canvas.removeEventListener('mousedown', onDown); canvas.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [])
  return <canvas ref={canvasRef} width={width} height={height} style={{ borderRadius: 8, background: '#fff' }} />
}


