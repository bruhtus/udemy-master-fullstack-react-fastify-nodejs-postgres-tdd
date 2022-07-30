const math = require('./math.js');

function doAdd(a, b) {
  return math.add(a, b);
}

function doSubtract(a, b) {
  return math.subtract(a, b);
}

function doMultiply(a, b) {
  return math.multiply(a, b);
}

function doDivide(a, b) {
  return math.divide(a, b);
}

module.exports = {
  doAdd,
  doSubtract,
  doMultiply,
  doDivide,
};
