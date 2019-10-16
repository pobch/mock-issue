import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '@testing-library/react'
import App from './App'
import { myModule as mockMyModule } from './myModule'

jest.mock('./myModule', () => {
  return {
    myModule: jest.fn()
  }
})

test('1 - with mocked module', () => {
  // This test works fine since I use the mocked module
  render(<App />)
  expect(mockMyModule).toHaveBeenCalled()
})

test('2 - with original module', () => {
  // Instead of the mocked module, I need to use original module in this test
  const { getByText } = render(<App />)
  expect(getByText(/original text/i)).toBeInTheDocument() // Not work
})
