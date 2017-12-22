const readline = require('readline');
const { parse } = require('./parse');
const { evaluate } = require('./evaluate');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function asyncREPL() {
  rl.question('>> ', (sequence) => {
    if (sequence === 'exit') {
      rl.close();
    } else {
      const ast = parse(sequence);
      const result = evaluate(ast);
      console.log('Result: ', result);
      asyncREPL();

    }
  });
}

asyncREPL();
