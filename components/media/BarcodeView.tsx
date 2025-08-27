'use client'

import React from 'react'
import Barcode from 'react-barcode'

export interface BarcodeViewProps { text: string }

export const BarcodeView: React.FC<BarcodeViewProps> = ({ text }) => {
  return <Barcode value={text} displayValue={true} />
}


