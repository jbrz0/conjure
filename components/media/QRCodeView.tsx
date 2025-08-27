'use client'

import React from 'react'
import QRCode from 'react-qr-code'

export interface QRCodeViewProps { text: string }

export const QRCodeView: React.FC<QRCodeViewProps> = ({ text }) => {
  return <QRCode value={text} size={160} />
}


