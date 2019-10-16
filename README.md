## Purpose

To demonstrate the issue with `jest.mock()`

## My Question

**After calling `jest.mock()` to mock a module, how can we restore that module?**

I have 2 different tests in `App.test.js` file. I want to use the mocked module in one test and use the original module in the other test. How to achieve this scenario? Already tried `jest.resetAllMocks()` and `mockClear()` without success.

## Steps to Reproduce

1. Clone this repo.
2. Run `yarn` to install dependencies.
3. Run `yarn test` to run test.
4. In `App.test.js`, if there is `jest.mock()`, the test **1 - with mocked module** will pass but the test **2 - with original module** will fail.
5. If there is not `jest.mock()`, the test **1 - with mocked module** will fail but the test **2 - with original module** will pass.
