/* eslint spaced-comment: 0, jsx-a11y/href-no-hash: 0, max-len: 0, no-use-before-define: 0, prefer-template: 0, no-console: 0*/
/***************************** ENVIRONMENT DEFINITIONS ***********************/
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

/**************************** EVALUATE LOGIC *********************************/
function evaluateWrapper(ast) {
  return evaluate(ast, 0);
}

function evaluate(ast, index) {
  const currentNode = ast[index]; // node in abstract syntax tree (ast)
  let currentIndex = index;

  if (typeof currentNode === 'number') { // base case, node is a number
    return currentNode;
  }
  if (typeof currentNode === 'object') { // recursive case, node is another expression
    return evaluate(currentNode, 0);
  }
  if (typeof currentNode === 'string') { // evaluate expression
    const operation = ENV[currentNode];
    const queue = []; // holds arguments as we perform operation on args
    currentIndex += 1;
    while (currentIndex < ast.length) {
      if (queue[0]) {
        queue[1] = evaluate(ast, currentIndex); // place next argument at end of queue
        const result = operation(queue[0], queue[1]);
        queue[0] = result; // place result at head of queue
      } else {
        queue[0] = evaluate(ast, currentIndex); // first argument
      }
      currentIndex += 1;
    }
    if (!queue[1] && operation.name === 'subtract') { // if 1 arg expression & operator is '-'
      queue[0] *= -1;
    }
    return queue[0];
  }
  throw new Error('Unexpectedly reached end of evaluate function without returning result.');
}

exports.evaluate = evaluateWrapper;
