function Parser() {
  let position = 0;

  function ignore() {
    position += 1;
  }

  function next() {
    position += 1;
  }

  return {
    ignore,
    position,
  };
}

function tokenize(sequence) {
  return sequence.split('');
}

function isDigit(char) {
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

function isOperator(char) {
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

function expression(tokens, parser) {
  while (tokens[parser.position] === ' ') {
    parser.ignore();
  }
  if (isOperator(tokens[paser.position])) {

  }
}

function buildAST(tokens, parser) {
  if (!tokens || tokens.length === 0) {
    return;
  }
  return expression(tokens, parser);
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
  } else { // expression
    const procedure = x[0]; // arithmetic procedure
    const args = x.slice(1, x.length).map((y) => evaluate(y));
    return procedure(args[0], args[1]);
  }
}

exports.eval = evaluate;




function parseNumbers(sequence) {

  console.log('number:', parseFloat(sequence));
}
exports.parseNumbers = parseNumbers;
function validateArithmetic(sequence) {
  if (sequence.match(/\d+(\.\d+)?((\+|\-|\*|\/)(\d+(\.\d+)?))?$/g)) {
    console.log('valid arithmetic');
  } else {
    console.log('invalid arithmetic');
  }
}
exports.validateArithmetic = validateArithmetic;









// function readFromTokens(tokens, ast) {
//   if (tokens.length === 0 && !state) {
//     return ast;
//   }
//   else if (tokens[0] === ' ') {
//     readFromTokens(tokens.splice(1, tokens.length), ast, state);
//   }
//   else if (tokens[0] === '(') {
//     const newAst = readExpression(tokens.splice(1, tokens.length));
//   }
//   else if (tokens[0].match(/(\+|\-|\*|\/)/) && state.match('expectingOperator')) {
//     ast.push(tokens[0]);
//     return readFromTokens(tokens.splice(1, tokens.length), ast);
//   }
//   else if (tokens[0].match(/\d/)) {
//     const { number, remainingTokens } = readNumber(tokens);
//     ast.push(parseFloat(number));
//     return readFromTokens(remainingTokens, ast);
//   }
//   else if (tokens[0] === ')' && state === false) {
//     return ast;
//   } else {
//     // throw error
//   }
// }
