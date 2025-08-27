'use client'

import React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import { Map, Marker, ZoomControl } from 'pigeon-maps';

export interface DynamicMapProps {
  center: { lat: number; lng: number };
  zoom?: number;
  markers?: Array<{ lat: number; lng: number; label?: string }>;
  height?: number;
  title?: string;
}

export const DynamicMap: React.FC<DynamicMapProps> = ({
  center,
  zoom = 12,
  markers = [],
  height = 360,
  title,
}) => {
  return (
    <Box>
      {title && (
        <Typography level="title-md" sx={{ mb: 1 }}>
          {title}
        </Typography>
      )}
      <div style={{ width: '100%', height }}>
        <Map defaultCenter={[center.lat, center.lng]} defaultZoom={zoom}>
          <ZoomControl />
          {markers.map((m, idx) => (
            <Marker key={idx} width={40} anchor={[m.lat, m.lng]} />
          ))}
        </Map>
      </div>
    </Box>
  );
};


