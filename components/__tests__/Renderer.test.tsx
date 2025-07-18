import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Renderer } from '../Renderer'
import { AIResponse } from '@/lib/types'

describe('Renderer Component', () => {
  it('renders text components correctly', () => {
    const response: AIResponse = {
      topline: 'Test response',
      layout: 'stack',
      components: [
        {
          kind: 'text',
          content: 'Hello, world!',
        },
      ],
    }

    render(<Renderer response={response} onFormSubmit={vi.fn()} />)
    
    expect(screen.getByText('Test response')).toBeInTheDocument()
    expect(screen.getByText('Hello, world!')).toBeInTheDocument()
  })

  it('renders card components correctly', () => {
    const response: AIResponse = {
      topline: 'Card test',
      layout: 'stack',
      components: [
        {
          kind: 'card',
          title: 'Test Card',
          body: 'This is a test card body.',
        },
      ],
    }

    render(<Renderer response={response} onFormSubmit={vi.fn()} />)
    
    expect(screen.getByText('Test Card')).toBeInTheDocument()
    expect(screen.getByText('This is a test card body.')).toBeInTheDocument()
  })

  it('renders rating components correctly', () => {
    const response: AIResponse = {
      topline: 'Rating test',
      layout: 'stack',
      components: [
        {
          kind: 'rating',
          value: 4,
          of: 5,
        },
      ],
    }

    render(<Renderer response={response} onFormSubmit={vi.fn()} />)
    
    expect(screen.getByText('4 / 5')).toBeInTheDocument()
  })

  it('handles unknown component types gracefully', () => {
    const response = {
      topline: 'Unknown component test',
      layout: 'stack' as const,
      components: [
        {
          kind: 'text' as const,
          content: 'Valid component',
        },
        {
          kind: 'unknown' as any,
          data: 'test',
        },
      ],
    }

    render(<Renderer response={response as AIResponse} onFormSubmit={vi.fn()} />)
    
    expect(screen.getByText('Valid component')).toBeInTheDocument()
    expect(screen.getByText(/Unsupported component type: unknown/i)).toBeInTheDocument()
  })
})
