'use client'

import React from 'react'
import {
  Card,
  FormGroup,
  InputGroup,
  HTMLSelect,
  Button,
  Tag,
  Intent,
} from '@blueprintjs/core'
import { DateInput3 } from '@blueprintjs/datetime2'
import { ComponentSpec, AIResponse } from '@/lib/types'
import Image from 'next/image'

interface RendererProps {
  response: AIResponse
}

interface ComponentRendererProps {
  component: ComponentSpec
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({ component }) => {
  switch (component.kind) {
    case 'text':
      return (
        <div className="bp5-running-text">
          <p>{component.content}</p>
        </div>
      )

    case 'image':
      return (
        <div className="image-container">
          <Image
            src={component.url}
            alt={component.alt || 'Generated image'}
            width={400}
            height={300}
            style={{ maxWidth: '100%', height: 'auto' }}
            className="bp5-elevation-1"
          />
        </div>
      )

    case 'rating':
      return (
        <div className="rating-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {Array.from({ length: component.of }, (_, i) => (
              <Tag
                key={i}
                intent={i < component.value ? Intent.PRIMARY : Intent.NONE}
                minimal={i >= component.value}
              >
                ★
              </Tag>
            ))}
            <span className="bp5-text-muted">
              {component.value} / {component.of}
            </span>
          </div>
        </div>
      )

    case 'card':
      return (
        <Card elevation={1} className="component-card">
          <h4 className="bp5-heading">{component.title}</h4>
          <p className="bp5-running-text">{component.body}</p>
        </Card>
      )

    case 'form':
      return (
        <Card elevation={1} className="form-card">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              // Handle form submission
              console.log('Form submitted')
            }}
          >
            {component.fields.map((field, index) => (
              <FormGroup key={index} label={field.label}>
                {field.field === 'input' && (
                  <InputGroup
                    placeholder={field.placeholder}
                    fill
                  />
                )}
                {field.field === 'date' && (
                  <DateInput3
                    fill
                    formatDate={(date) => date.toLocaleDateString()}
                    parseDate={(str) => new Date(str)}
                    placeholder="Select date..."
                  />
                )}
                {field.field === 'select' && (
                  <HTMLSelect fill options={field.options} />
                )}
              </FormGroup>
            ))}
            <Button type="submit" intent={Intent.PRIMARY} text="Submit" />
          </form>
        </Card>
      )

    default:
      // Fallback for unknown component types
      return (
        <Card elevation={1} className="fallback-card">
          <h5 className="bp5-heading">Unknown Component</h5>
          <pre className="bp5-code-block">
            {JSON.stringify(component, null, 2)}
          </pre>
        </Card>
      )
  }
}

const Renderer: React.FC<RendererProps> = ({ response }) => {
  const getLayoutClassName = (layout: AIResponse['layout']) => {
    switch (layout) {
      case 'grid':
        return 'renderer-grid'
      case 'carousel':
        return 'renderer-carousel'
      case 'modal':
        return 'renderer-modal'
      case 'stack':
      default:
        return 'renderer-stack'
    }
  }

  return (
    <div className="renderer-container">
      <div className="topline">
        <h3 className="bp5-heading">{response.topline}</h3>
      </div>
      <div className={`components-container ${getLayoutClassName(response.layout)}`}>
        {response.components.map((component, index) => (
          <ComponentRenderer key={index} component={component} />
        ))}
      </div>
    </div>
  )
}

export default Renderer
