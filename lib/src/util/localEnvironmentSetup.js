const path = require('path');
const fs = require('fs');

const { appDirectory, iterateUserEnvironment } = require('.');

const injectLocalEnvironment = (raw) => {
  let injected = raw;
  iterateUserEnvironment((key, value) => {
    injected = injected.replace(new RegExp(`${key}: [^,{}]+`), `${key}: '${value}'`);
  });
  return injected;
}

const localEnvironmentSetup = (app) => {
  const script = fs.readFileSync(path.join(appDirectory, 'public/env.js')).toString();
  app.get('/env.js', (req, res) => {
    res.set('Content-Type', 'text/javascript');
    const injectedScript = injectLocalEnvironment(script);
    res.send(injectedScript);
  })
};

module.exports = localEnvironmentSetup
