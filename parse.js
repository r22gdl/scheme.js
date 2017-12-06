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

function tokenize(sequence) {
  return sequence.split('');
}

function readFromTokens(tokens, ast, state) {
  if (tokens.length === 0 && !state) {
    return ast;
  } else if (tokens[0] === ' ') {
    return readFromTokens(tokens.splice(1, tokens.length), ast, state);
  } else if (tokens[0] === '(') {
    return readFromTokens(tokens.splice(1, tokens.length), Array(), 'expectingOperator');
  } else if (tokens[0].match(/(\+|\-|\*|\/)/) && state.match('expectingOperator')) {
    ast.push(tokens[0]);
    return readFromTokens(tokens.splice(1, tokens.length), ast);
  } else if (tokens[0].match(/\d/)) {
    const { number, remainingTokens } = readNumber(tokens);
    ast.push(parseFloat(number));
    return readFromTokens(remainingTokens, ast);
  } else if (tokens[0] === ')' && state === false) {
    return ast;
  } else {
    // throw error
  }
}

function parse(sequence) {
  
}

/*
  Sequence has already been screened for syntax errors, all strings expected to be operators
*/
function evaluate(x) {
  if (typeof x === 'number') {
    return x;
  } else { // (typeof x[0] === 'string')
    const procedure = x[0];
    const args = x.slice(1, x.length).map((arg) => evaluate(arg));
    return procedure(args[0], args[1]);
  }
}

exports.eval = evaluate;













