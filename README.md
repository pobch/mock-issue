## Purpose

To demonstrate the issue with `jest.mock()`

## My Question

**After calling `jest.mock()` to mock a module, how can we restore that module?**

I have 2 different tests in `App.test.js` file. I want to use the mocked module in one test and use the original module in the other test. How to achieve this scenario? Already tried `jest.resetAllMocks()` and `mockClear()` without success.

## Steps to Reproduce

1. Clone this repo.
2. Run `yarn` to install dependencies.
3. Run `yarn test` to run test.
4. In `App.test.js`, if there is `jest.mock()`, the test _"1 - with mocked module"_ will pass but the test _"2 - with original module"_ will fail.
5. On the other hand, if there is not `jest.mock()`, the test _"1 - with mocked module"_ will fail but the test _"2 - with original module"_ will pass.

## Solutions

### 1st Option (Implemented in this repo)

From this [issue](https://github.com/facebook/jest/issues/2649#issuecomment-360467278)

1. Add this code into the beginning of the test that we want to restore `mockMyModule` to the original form

   ```javascript
   mockMyModule.mockImplementationOnce(require.requireActual('./myModule').myModule)
   ```

   Or using `mockImplementation()` instead

   ```javascript
   mockMyModule.mockImplementationOnce(require.requireActual('./myModule').myModule)
   ```

2. Don't forget to `mockReset()` if we want other test cases to use the initial `jest.mock()` version
   ```javascript
   mockMyModule.mockReset()
   ```

### 2nd Option

https://stackoverflow.com/a/53166827/6568503

## Learn More

- [Jest's mockImplementation VS mockImplementationOnce](https://techblog.topdesk.com/coding/frontend-testing-with-jest-mocks/)
- [require VS import in Jest](https://medium.com/trabe/mocking-different-values-for-the-same-module-using-jest-a7b8d358d78b)
