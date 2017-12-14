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
/*
still need to check for end of tokens
*/
function readNumber(tokens, parser) {
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
    else if isValidDigit(currentToken) {
      numericalStr += currentToken;
      parser.next();
    }tokens[parser.position]
    else if (isValidEndToNumber(currentToken)) {
      isComplete = true;
    }
    else {
      return TypeError('Incorrect numerical input at position: ' +  parser.position);
    }
  }
  return parseFloat(numericalStr);
}

exports.readNumber = readNumber;

function nextChar(tokens, parser) {
  while (tokens[parser.position] === ' ') {
    parser.ignore();
  }
  return tokens[parser.position];
}

function readExpression (tokens, parser) {
  let currentToken = tokens[parser.position];
  let expression = [];
  expression.push(currentToken); // push operator
  let continues = true;
  while (continues) {
    currentToken = nextChar(tokens, parser);
    switch (currentToken) {
      case '(':
        expression.push(read(tokens, parser));
        parser.next();
      case ')':
        return expression;
      default:
        if (isValidDigit(currentToken) || isDecimal(currentToken)) {
          expression.push(readNumber(tokens, parser));
          parser.next();
        }
    }
  }
    if (isValidDigit(currentToken)) {
      const firstArg = readNumber(tokens, parser);
      currentToken = nextChar(tokens, parser);
      if (currentToken === ')') {
        if (operator === '+') {
          expression.push(float);
        } else if (operator === '-') {
          expression.push(float * (-1));
        } else {
          console.log('syntax error at position:', parser.position);
        }
      } else if (isValidDigit(currentToken)) {
        const secondArg = readNumber(tokens, parser);
        expression.push(se)
      }
    }
  }
}

function read(tokens, parser) {
  let currentToken = nextChar(tokens, parser);
  if (currentToken === '(') {
    if (isValidOperator(currentToken)) {
      readExpression(tokens, parser);
    } else {
      console.log('invalid syntax at position: '+ parser.position + '. Expecting operator to denote an operation to be performed or a real number');
    }
  } else {
      console.log('invalid syntax at position: '+ parser.position + '. Expecting opening brace to denote an expression');
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


// function peek (tokens, parser) {
//   nextChar(tokens, parser);
//   const startPosition = parser.position;
  
//   let currentToken;
//   currentToken = tokens[parser.position];
//   if (currentToken === '-' || currentToken === '+') {
//     let isAtom = false;
//     let isExpression = false;
//     while (!isAtom || ~isExpression) {
//       nextChar(tokens, parser);
//       currentToken = tokens[parser.position];
//       if (currentToken)
//     } 
//   }
//   nextChar();
// }
