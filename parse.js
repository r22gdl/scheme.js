function Parser() {
  let pos = 0;

  function ignore() {
    pos += 1;
  }

  function next() {
    pos += 1;
  }

  return {
    ignore,
    next,
    get position () { return pos },
    set position (x) { pos = x },
  };
}
exports.Parser = Parser;

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

function tokenize(sequence) {
  return sequence.split('');
}

function isValidDigit(char) {
  switch (char) {
    case '1':
      return true;
    case '2':
      return true;
    case '3':
      return true;
    case '4':
      return true;
    case '5':
      return true;
    case '6':
      return true;
    case '7':
      return true;
    case '8':
      return true;
    case '9':
      return true;
    case '0':
      return true;
    default:
      return false;
  }
}

function isValidOperator(char) {
  switch (char) {
    case '+':
      return true;
    case '-':
      return true;
    case '*':
      return true;
    case '/':
      return true;
    default:
      return false;
  }
}

function isDecimal(char) {
  return char === '.';
}

function isValidEndToNumber (char) {
  switch (char) {
    case '(':
      return true;
    case ')':
      return true;
    case ' ':
      return true;
    default:
      return isValidOperator(char);
  }
}

function isValidExpression(expression) {
  console.log('isValidExpression():', expression);
  if (expression[0]) { // operator
    if ((expression[0] === '/' || expression[0] === '*') && 
    expression[1] && expression[2]) {
      return true;
    } else if ((expression[0] === '+' || expression[0] === '-') &&
    expression[1]) {
      return true;
    }
  }
  return false;
}

function getNextNonWhitespace(tokens, parser) {
  while (tokens[parser.position] === ' ') {
    parser.ignore();
  }
  return tokens[parser.position];
}

function readNumber(tokens, parser) {
  console.log('readNumber() position:', parser.position);
  let numericalStr = '';
  let isDecimal = false;
  let isComplete = false;
  let isNegative
  let currentToken;
  while(!isComplete) {
    currentToken = tokens[parser.position];
    if (!isDecimal && currentToken === '.') {
      numericalStr += currentToken;
      isDecimal = true;
      parser.next();
    }
    else if (isValidDigit(currentToken)) {
      numericalStr += currentToken;
      parser.next();
    }
    else if (isValidEndToNumber(currentToken)) {
      isComplete = true;
    }
    else {
      return TypeError('Incorrect numerical input at position: ' +  parser.position);
    }
  }
  return parseFloat(numericalStr);
}

function readExpression (tokens, parser, expression) {
  console.log('readExpression() position:', parser.position);
  getNextNonWhitespace(tokens, parser);
  let currentToken = tokens[parser.position];
  if (currentToken === '(') { // new expression
    var newExpression = read(tokens, parser);
    expression.push(newExpression);
    return readExpression(tokens, parser, expression);
  } else if (currentToken === ')' && isValidExpression(expression)) { // end of expression
    console.log('end of expression:', expression);
    parser.next();
    return expression;
  } else if (expression[0] && (isValidDigit(currentToken) || isDecimal(currentToken))) { // number
    expression.push(readNumber(tokens, parser));
    parser.next();
    return readExpression(tokens, parser, expression);
  } else if (isValidOperator(currentToken) && !expression[0]) { // operator
    expression.push(currentToken);
    parser.next();
    return readExpression(tokens, parser, expression);
  } else if (currentToken === undefined) { // end of tokens
    console.log('end of tokens. expression tree:', expression);
    return expression;
  } else {
    console.log('syntax error at position:', parser.position);
  }
}

function read(tokens, parser) {
  console.log('read() position:', parser.position);
  let currentToken = getNextNonWhitespace(tokens, parser);
  if (currentToken === '(') {
    parser.next();
    getNextNonWhitespace(tokens, parser);
    let emptyExpression = Array();
    return readExpression(tokens, parser, emptyExpression);
  } else {
      console.log('Invalid syntax at position: '+ parser.position + '. Expecting opening brace to denote an expression');
  }
}

function buildAST(tokens, parser) {
  if (!tokens || tokens.length === 0) {
    return;
  }
  return read(tokens, parser);
}

function parse(programSequence) {
  const tokens = tokenize(programSequence);
  let ast = [];
  const parser = Parser();
  try {
    ast = buildAST(tokens, parser);
  } catch (err) {
    console.log('syntax error\n', err);
  }
  return ast;
}
exports.parse = parse;

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