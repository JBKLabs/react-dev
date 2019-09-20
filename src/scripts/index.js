#!/usr/bin/env node
/* eslint-disable no-console */

const path = require('path');
const spawn = require('cross-spawn');

const [executor, , script, ...args] = process.argv;

const handleSignal = (result) => {
  if (result.signal === 'SIGKILL') {
    console.log(
      `The script "${script}" failed because the process exited too early. ` +
      'This probably means the system ran out of memory or someone called ' +
      '`kill -9` on the process.'
    );
  } else if (result.signal === 'SIGTERM') {
    console.log(
      `The script "${script}" failed because the process exited too early. ` +
      'Someone might have called `kill` or `killall`, or the system could ' +
      'be shutting down.'
    );
  }
  process.exit(1);
};

if (script) {
  try {
    const relativeScriptPath = path.join(__dirname, script);
    const scriptPath = require.resolve(relativeScriptPath);

    const result = spawn.sync(executor, [scriptPath, ...args], {
      stdio: 'inherit'
    });

    if (result.signal) {
      handleSignal(result);
    } else {
      process.exit(result.status);
    }
  } catch (error) {
    console.log(`unknown script "${script}"`);
  }
} else {
  console.log('please enter a command.');
}
