const spawn = require('cross-spawn');
const yargsParser = require('yargs-parser');

const { resolveBin } = require('../util');

let args = process.argv.slice(2);
const parsedArgs = yargsParser(args);

const filesGiven = parsedArgs._.length > 0;
const filesToApply = filesGiven ? [] : ['.'];
if (filesGiven) {
  args = args.filter(
    (arg) => !parsedArgs._.includes(arg) || /\.jsx?$/.test(arg)
  );
}

const result = spawn.sync(resolveBin('eslint'), [...args, ...filesToApply], {
  stdio: 'inherit'
});

process.exit(result.status);
