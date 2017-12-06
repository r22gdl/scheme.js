const readline = require('readline');
const { validateArithmetic } = require('./parse');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function asyncREPL() {
  rl.question('schemeInterpreter >> ', (sequence) => {
    if (sequence === 'exit') {
      rl.close();
    } else {
      validateArithmetic(sequence);
      asyncREPL();
    }
  });
}

asyncREPL();
