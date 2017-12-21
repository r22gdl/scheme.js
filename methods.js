function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

const ENV = {
  '+': add,
  '-': subtract,
  '*': multiply,
  '/': divide,
};


/*
  Sequence has already been screened for syntax errors, all strings expected to be operators
*/
function evaluate(x) {
  if (typeof x === 'number') {
    return x;
  } else { // read expression
    const procedure = x[0]; // arithmetic procedure
    const args = x.slice(1, x.length).map((y) => evaluate(y));
    return procedure(args[0], args[1]);
  }
}
exports.eval = evaluate;