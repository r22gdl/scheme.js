/* eslint spaced-comment: 0, jsx-a11y/href-no-hash: 0, max-len: 0, no-use-before-define: 0, prefer-template: 0, no-console: 0*/

/********************** TOKENIZER ***********************************/
function tokenize(sequence) {
  return sequence.split('');
}

/********************** CUSTOM SYNTAX ERROR TYPE ***************************/
function SchemeSyntaxError(description) {
  const message = 'Invalid Scheme syntax:\n' + description;
  const instance = new Error(message);
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  return instance;
}

SchemeSyntaxError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true,
  },
});

function errorDescription(token, position, message) {
  return 'Unexpected token \'' + token + '\' at position ' + position + '.\n' + message;
}

/*********************** GENERAL METHODS ****************************/
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


function isValidExpression(expression) {
  if (expression[0]) { // operator
    if (expression[0] === '/' || expression[0] === '*') {
      if (expression[1] && expression[2]) {
        return true;
      }
      throw new SchemeSyntaxError('A division or product operator must ' +
        'be followed by a total of at least two expressions and/or numbers.');
    }
    if (expression[0] === '+' || expression[0] === '-') {
      if (expression[1]) {
        return true;
      }
      throw new SchemeSyntaxError('An addition or subtraction operator must ' +
        'be followed by at least one number and/or expression.');
    }
  }
  throw new SchemeSyntaxError('An expression must contain exactly one operator.');
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

function tokensRemain(tokens, parser) {
  getNextNonWhitespace(tokens, parser);
  if (parser.position <= tokens.length - 1) {
    return true;
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
  let numericalStr = '';
  let hasDecimal = false;
  let hasDigit = false;
  let isComplete = false;
  while (!isComplete) {
    const currentToken = tokens[parser.position];
    if (!hasDecimal && currentToken === '.') {
      numericalStr += currentToken;
      hasDecimal = true;
      parser.next();
    } else if (isValidDigit(currentToken)) {
      hasDigit = true;
      numericalStr += currentToken;
      parser.next();
    } else if ((currentToken === ' ' || currentToken === '(' || currentToken === ')'
      || currentToken === undefined) && ((hasDecimal && hasDigit) || hasDigit)) {
      isComplete = true;
    } else {
      throw new SchemeSyntaxError(errorDescription(
        currentToken,
        parser.position,
        'A number must consist of at least one digit and at most one decimal symbol.',
      ));
    }
  }
  return parseFloat(numericalStr);
}

function readExpression(tokens, parser, expression) {
  getNextNonWhitespace(tokens, parser);
  const currentToken = tokens[parser.position];

  if (currentToken === '(') { // new expression
    if (expression[0]) {
      const newExpression = read(tokens, parser);
      expression.push(newExpression);
      return readExpression(tokens, parser, expression);
    }
    throw new SchemeSyntaxError(errorDescription(
      currentToken,
      parser.position,
      'Expected an operator to denote the operation associated with the expression previously declared.',
    ));
  }

  if (currentToken === ')') { // end of expression
    if (isValidExpression(expression)) { // more specific errors thrown in this function
      parser.next();
      return expression;
    }
  }

  if ((isValidDigit(currentToken) || isDecimal(currentToken))) { // number
    if (expression[0]) {
      expression.push(readNumber(tokens, parser));
      return readExpression(tokens, parser, expression);
    }
    throw new SchemeSyntaxError(errorDescription(
      currentToken,
      parser.position,
      'An expression must begin with an operator before the first instance of a number.',
    ));
  }

  if (isValidOperator(currentToken)) { // operator
    if (!expression[0]) {
      expression.push(currentToken);
      parser.next();
      return readExpression(tokens, parser, expression);
    }
    throw new SchemeSyntaxError(errorDescription(
      currentToken,
      parser.position,
      'An expression consists of exactly one operator followed by any combination of numbers or expressions.',
    ));
  }

  if (currentToken === undefined) { // end of tokens
    throw new SchemeSyntaxError('Reached end of input without closing an expression with a \')\'.\n' +
      'Denote the start of an expression with an open paren and the end of an expression with a close paren.');
  }

  throw new SchemeSyntaxError(errorDescription(
    currentToken,
    parser.position,
    'Unexpectedly reached end of tokens.',
  ));
}

function read(tokens, parser) {
  const currentToken = getNextNonWhitespace(tokens, parser);
  if (currentToken === '(') {
    parser.next();
    const emptyExpression = [];
    return readExpression(tokens, parser, emptyExpression);
  } else if (currentToken === undefined) { // user entered nothing
    return [];
  }
  throw new SchemeSyntaxError(errorDescription(
    currentToken,
    parser.position,
    'Expected an \'(\' to denote the start of the main expression.',
  ));
}

function buildAST(tokens, parser) {
  let ast = [];
  if (!tokens || tokens.length === 0) {
    return ast;
  }
  ast = read(tokens, parser);
  if (tokensRemain(tokens, parser)) {
    const currentToken = tokens[parser.position];
    throw new SchemeSyntaxError(errorDescription(
      currentToken,
      parser.position,
      'No symbols expected beyond the final close paren that denotes the end of the main expression.',
    ));
  }
  return ast;
}

/************************** EXPORT *****************************/
function parse(programSequence) {
  const tokens = tokenize(programSequence);
  let ast = [];
  const parser = Parser();
  try {
    ast = buildAST(tokens, parser);
  } catch (err) {
    if (err instanceof SchemeSyntaxError) {
      console.error(err.message);
      return [];
    }
    console.error('Unhandled error in Scheme interpreter at position ' + parser.position + '. Exiting.\n'
      + err);
    process.exit(1);
  }
  return ast;
}

exports.parse = parse;
