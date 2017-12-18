const readline = require('readline');
const { parse } = require('./parse');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function asyncREPL() {
  rl.question('schemeInterpreter >> ', (sequence) => {
    if (sequence === 'exit') {
      rl.close();
    } else {
      var ast = parse(sequence);
      console.log('asyncREPL, ast:', ast);
      asyncREPL();
    }
  });
}

asyncREPL();
