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
function shiftLeft(array) {
  array[0] = array[1];
}

function evaluateWrapper(ast) {
  console.log('evaluateWrapper()');
  return evaluate(ast, 0);
}

function evaluate(ast, index) {
  console.log('evaluate() index:', index);
  let currentNode = ast[index];
  let currentIndex = index;
  const stack = [];
  if (typeof currentNode === 'number') {
    console.log('typeof currentNode === number');
    return currentNode;
  }
  if (typeof currentNode === 'object') {
    console.log('typeof currentNode === object');
    return evaluate(currentNode, 0);
  }
  if (typeof currentNode === 'string') {
    console.log('typeof currentNode === string');
    const operation = ENV[currentNode];
    let queue = [];
    currentIndex += 1;
    console.log('operation:', operation.name);
    while (currentIndex < ast.length) {
      console.log('currentIndex:', currentIndex);
      if (queue[0]) {
        queue[1] = evaluate(ast, currentIndex);
        console.log('queue[1]');
        const result = operation(queue[0], queue[1]);
        queue[0] = result;
      } else {
        queue[0] = evaluate(ast, currentIndex);
        console.log('set queue[0] to:', queue[0]);
      }
      currentIndex += 1;
    }
    if (!queue[1] && operation.name === 'subtract') {
      console.log('subtract single atom');
      queue[0] = (-1) * queue[0];
    }
    return queue[0];
  }
  console.log('error: reached end of evaluate without returning');
}

exports.evaluate = evaluateWrapper;
