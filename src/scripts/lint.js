const spawn = require('cross-spawn');
const yargsParser = require('yargs-parser');

const { resolveBin } = require('../util');

let args = process.argv.slice(2);
console.log(process.argv);
const parsedArgs = yargsParser(args);

const filesGiven = parsedArgs._.length > 0;
const filesToApply = filesGiven ? [] : ['.'];
if (filesGiven) {
  // we need to take all the flag-less arguments (the files that should be linted)
  // and filter out the ones that aren't js files. Otherwise json or css files
  // may be passed through
  args = args.filter(
    (arg) => !parsedArgs._.includes(arg) || /\.jsx?$/.test(arg)
  );
}

console.log({ parsedArgs });

const result = spawn.sync(resolveBin('eslint'), [...args], {
  stdio: 'inherit'
});

process.exit(result.status);
