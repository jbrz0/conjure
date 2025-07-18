'use client'

import React from 'react'
import Image from 'next/image'
import { Card, Icon } from '@blueprintjs/core'
import { AIResponse, ComponentSpec } from '@/lib/types'
import { DynamicForm } from './DynamicForm'
import { DynamicChart } from './DynamicChart'

interface RendererProps {
  response: AIResponse
  onFormSubmit: (formData: Record<string, string>) => void
}

const renderComponent = (
  component: ComponentSpec,
  onFormSubmit: (formData: Record<string, string>) => void
) => {
  switch (component.kind) {
    case 'text':
      return <p className="bp5-running-text">{component.content}</p>

    case 'image':
      return (
        <Image
          src={component.url}
          alt={component.alt || 'generated image'}
          width={400}
          height={300}
          className="rounded-lg max-w-full h-auto"
        />
      )

    case 'rating':
      return (
        <div className="flex items-center">
          <Icon icon="star" className="mr-1" /> {component.value} / {component.of}
        </div>
      )

    case 'card':
      return (
        <Card>
          <h5 className="font-bold text-lg">{component.title}</h5>
          <p>{component.body}</p>
        </Card>
      )

    case 'form':
      return <DynamicForm fields={component.fields} onSubmit={onFormSubmit} />

    case 'chart':
      return <DynamicChart data={component.data} width={500} height={300} />

    default:
      // @ts-ignore
      return <p className="text-red-500">Unsupported component type: {component.kind}</p>
  }
}

export const Renderer: React.FC<RendererProps> = ({ response, onFormSubmit }) => {
  const layoutClasses = {
    stack: 'flex flex-col space-y-4',
    grid: 'grid grid-cols-1 md:grid-cols-2 gap-4',
    carousel: 'flex space-x-4 overflow-x-auto p-4',
    modal: '', // Modal layout would be handled by a parent component
  }

  return (
    <div className="p-4">
      {response.topline && <h3 className="text-2xl font-bold mb-4">{response.topline}</h3>}
      <div className={layoutClasses[response.layout]}>
        {response.components.map((component, index) => (
          <div key={index}>{renderComponent(component, onFormSubmit)}</div>
        ))}
      </div>
    </div>
  )
}
