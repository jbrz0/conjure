import { expect, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers)

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})

// Provide minimal CSS-related globals to avoid ESM packages importing CSS from crashing in JSDOM.
// Some libraries (e.g., @mui/x-data-grid) import CSS files; we don't render them in tests.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(global as any).CSSStyleSheet = (global as any).CSSStyleSheet || function () {}

// Mock DataGrid to avoid importing its CSS in test runs
vi.mock('@mui/x-data-grid', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const React = require('react') as typeof import('react')
  const DataGrid = (props: any) => React.createElement('div', { 'data-testid': 'data-grid', ...props })
  return { DataGrid }
})
