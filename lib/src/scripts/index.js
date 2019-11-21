#!/usr/bin/env node
/* eslint-disable no-console */
const path = require('path');
const spawn = require('cross-spawn');

const { log, handleSpawnResult } = require('../util');

const [executor, , script, ...args] = process.argv;

if (script) {
  try {
    const relativeScriptPath = path.join(__dirname, script);
    const scriptPath = require.resolve(relativeScriptPath);

    const result = spawn.sync(executor, [scriptPath, ...args], {
      stdio: 'inherit'
    });

    handleSpawnResult(result, script);
    process.exit(result.status);
  } catch (error) {
    log(`unknown script "${script}"`);
  }
} else {
  console.log('please enter a command.');
}
