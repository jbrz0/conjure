'use client'

import React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export interface DynamicDataGridProps {
  columns: Array<{
    field: string;
    headerName?: string;
    width?: number;
  }>;
  rows: Array<Record<string, string | number | boolean> & { id?: string | number }>;
  pageSize?: number;
  height?: number;
  title?: string;
}

export const DynamicDataGrid: React.FC<DynamicDataGridProps> = ({
  columns,
  rows,
  pageSize = 5,
  height = 420,
  title,
}) => {
  const gridColumns: GridColDef[] = columns.map((c) => ({
    field: c.field,
    headerName: c.headerName ?? c.field,
    width: c.width,
  }));

  // Ensure rows have ids for the DataGrid
  const normalizedRows = rows.map((r, idx) => ({ id: idx, ...r, idFallback: undefined }));

  return (
    <Box>
      {title && (
        <Typography level="title-md" sx={{ mb: 1 }}>
          {title}
        </Typography>
      )}
      <div style={{ width: '100%', height }}>
        <DataGrid
          rows={normalizedRows}
          columns={gridColumns}
          initialState={{
            pagination: { paginationModel: { pageSize } },
          }}
          pageSizeOptions={[5, 10, 25]}
        />
      </div>
    </Box>
  );
};


