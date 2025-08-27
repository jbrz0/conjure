'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer as any), { ssr: false }) as any
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer as any), { ssr: false }) as any
const Polyline = dynamic(() => import('react-leaflet').then(m => m.Polyline as any), { ssr: false }) as any
const Polygon = dynamic(() => import('react-leaflet').then(m => m.Polygon as any), { ssr: false }) as any

export interface MapAdvancedProps {
  center: { lat: number; lng: number }
  zoom?: number
  polylines?: { points: { lat: number; lng: number }[]; color?: string }[]
  polygons?: { points: { lat: number; lng: number }[]; color?: string; fillColor?: string }[]
}

export const MapAdvanced: React.FC<MapAdvancedProps> = ({ center, zoom = 12, polylines = [], polygons = [] }) => {
  return (
    <div style={{ width: '100%', height: 360 }}>
      <MapContainer center={[center.lat, center.lng]} zoom={zoom} style={{ width: '100%', height: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {polylines.map((l, idx) => (
          <Polyline key={idx} positions={l.points.map(p => [p.lat, p.lng])} pathOptions={{ color: l.color || '#2b8a3e' }} />
        ))}
        {polygons.map((p, idx) => (
          <Polygon key={idx} positions={p.points.map(pt => [pt.lat, pt.lng])} pathOptions={{ color: p.color || '#1971c2', fillColor: p.fillColor || '#74c0fc' }} />
        ))}
      </MapContainer>
    </div>
  )
}


