const app = require('./jest-example');
const math = require('./math');

describe('app operation', () => {
  const multiplyMock = jest.spyOn(math, 'multiply');
  multiplyMock.mockReturnValue('itu');

  test('call math.add()', () => {
    const add = jest.spyOn(math, 'add');

    add.mockImplementation(() => 'anu');
    console.log(app.doAdd(1, 2));
    expect(app.doAdd(1, 2)).toBe('anu');

    add.mockRestore();
    console.log(app.doAdd(1, 2));
    expect(app.doAdd(1, 2)).toBe(3);
  });

  test('call math.subtract()', () => {
    const subtract = jest.spyOn(math, 'subtract');

    subtract.mockImplementation(() => 'nganu');
    console.log(app.doSubtract(1, 2));
    expect(app.doSubtract(1, 2)).toBe('nganu');
  });

  test('call math.subtract() again', () => {
    console.log(app.doSubtract(1, 2));
  });

  test('call math.multiply()', () => {
    console.log(app.doMultiply(1, 2));
  });
});
