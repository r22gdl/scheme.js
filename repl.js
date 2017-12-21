const readline = require('readline');
const { parse } = require('./parse');
// const execute = require('./execute');

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
      //const resolve = execute(ast);
      //console.log('type: ', typeof resolve);
      //console.log(resolve);
      asyncREPL();
    }
  });
}

asyncREPL();
