const app = require('./jest-example');
const math = require('./math');

// Note: set all module functions to jest.fn().
// Disadvantage:
// it's difficult to access the actual module in the same file.
jest.mock('./math');

it('can call math.add', () => {
  app.doAdd(1, 2);
  expect(math.add).toBeCalledWith(1, 2);
});
