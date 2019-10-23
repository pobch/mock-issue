import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '@testing-library/react'
import App from './App'
import { myModule as mockMyModule } from './myModule'

// -------------- MOCK
jest.mock('./myModule', () => {
  return {
    myModule: jest.fn()
  }
})

afterEach(() => {
  // Reset to the jest.mock() version
  jest.resetAllMocks()
})

// -------------- TEST CASES
test('1 - with mocked module', () => {
  // This test works fine since I use the mocked module from jest.mock()
  render(<App />)
  expect(mockMyModule).toHaveBeenCalled()
})

test('2 - with original module', () => {
  // Instead of the mocked module, I need to use original module in this test

  // Restore to the original module
  mockMyModule.mockImplementationOnce(require.requireActual('./myModule').myModule)

  const { getByText } = render(<App />)
  expect(getByText(/original text/i)).toBeInTheDocument()
})

test('3 - with mocked module again', () => {
  // This test needs the mocked module from jest.mock() again
  // Test whether `mockMyModule` was resetted to the initial jest.mock() version
  const { queryByText } = render(<App />)
  expect(mockMyModule).toHaveBeenCalledTimes(1)
  expect(queryByText(/original text/i)).toBeNull()
})
