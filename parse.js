/* eslint spaced-comment: 0, jsx-a11y/href-no-hash: 0, max-len: 0, no-use-before-define: 0, prefer-template: 0*/
function tokenize(sequence) {
  return sequence.split('');
}
/*********************** GENERAL METHODS ***************************/
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

function isValidEndToNumber(char) {
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
  // console.log('isValidExpression():', expression);
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

/************************ PARSER SPECIFIC METHODS ******************/
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
    get position() { return pos; },
    set position(x) { pos = x; },
  };
}

function getNextNonWhitespace(tokens, parser) {
  while (tokens[parser.position] === ' ') {
    parser.ignore();
  }
  return tokens[parser.position];
}

function readNumber(tokens, parser) {
  // console.log('readNumber() position:', parser.position);
  let numericalStr = '';
  let hasDecimal = false;
  let isComplete = false;
  // let isNegative
  let currentToken;
  while (!isComplete) {
    currentToken = tokens[parser.position];
    if (!hasDecimal && currentToken === '.') {
      numericalStr += currentToken;
      hasDecimal = true;
      parser.next();
    } else if (isValidDigit(currentToken)) {
      numericalStr += currentToken;
      parser.next();
    } else if (isValidEndToNumber(currentToken)) {
      isComplete = true;
    } else {
      return TypeError('Incorrect numerical input at position: ' + parser.position);
    }
  }
  return parseFloat(numericalStr);
}

function read(tokens, parser) {
  // console.log('read() position:', parser.position);
  const currentToken = getNextNonWhitespace(tokens, parser);
  if (currentToken === '(') {
    parser.next();
    getNextNonWhitespace(tokens, parser);
    const emptyExpression = [];
    return readExpression(tokens, parser, emptyExpression);
  }
  // console.log('Invalid syntax at position: '+ parser.position +
  //'. Expecting opening brace to denote an expression');
  return null;
}

function readExpression(tokens, parser, expression) {
  // console.log('readExpression() position:', parser.position);
  getNextNonWhitespace(tokens, parser);
  const currentToken = tokens[parser.position];
  if (currentToken === '(') { // new expression
    const newExpression = read(tokens, parser);
    expression.push(newExpression);
    return readExpression(tokens, parser, expression);
  } else if (currentToken === ')' && isValidExpression(expression)) { // end of expression
    // console.log('end of expression:', expression);
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
    // console.log('end of tokens. expression tree:', expression);
    return expression;
  }
  // console.log('syntax error at position:', parser.position);
  return null;
}


function buildAST(tokens, parser) {
  if (!tokens || tokens.length === 0) {
    return [];
  }
  return read(tokens, parser);
}

/************************** EXPORT *****************************/
function parse(programSequence) {
  const tokens = tokenize(programSequence);
  let ast = [];
  const parser = Parser();
  try {
    ast = buildAST(tokens, parser);
  } catch (err) {
    // console.log('syntax error\n', err);
  }
  return ast;
}

exports.parse = parse;
