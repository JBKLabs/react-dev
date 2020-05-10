# JBKnowledge React Development

## Installation

```bash
npm install @jbknowledge/react-dev
```

**package.json**
```json
{
  "scripts": {
    "lint": "jbk-scripts lint src/*",
    "start": "jbk-scripts start",
    "build": "jbk-scripts build",
    "configure": "jbk-scripts configure",
    "eject": "jbk-scripts eject"
  },
}
```

## jbk-scripts

`@jbknowledge/react-dev` provides a handful of scripts for your development environment.

**Environment**:

All scripts are configured to read a `.env` file for configuration. Further documentation for what environment variables options are available can be seen below.

### **lint**

`jbk-scripts lint [options] <paths>`

lint will run both `prettier` and `eslint` on your behalf.

options:
* `--fix`: Auto fix lint errors

paths:
* A list of file patterns to match. i.e. `index.js`, `src/**`, `!node_modules`, etc

available overrides:
- eslint config
- eslint ignore
- prettier config
- prettier ignore

### **start**

`jbk-scripts start`

start will spin up a webpack dev server on your behalf pointing to your entry point with the following precedence:

* `--entry-point` optional option
* `package.json#main`
* src/index.js


options:
* `--entry-point`: Change entrypoint js path. i.e. `./packages/client/index.js`

available overrides:
- webpack config
- babel config

`.env` options:
- each of `ENV_<key>` will replace the value of `window.env.<key>` if it exists

### **build**

`jbk-scripts build`

build will generate a production bundle of your site and output to `dist/*` using the entry point you define with the following precedence:

* `--entry-point` optional option
* `package.json#main`
* src/index.js

options:
* `--entry-point`: Change entrypoint js path. i.e. `./packages/client/index.js`

available overrides:
- webpack config
- babel config

**options**
* `--build-path <projectRootRelativePath>`
  * By default, `jbk-scripts` builds to `./dist`. If you need to change this path, i.e. to `./build`, you can do so using this option.

### **configure**

`jbk-scripts configure`

configure will inject `ENV_*` into your `<build>/env.js` file for releases.

**options**
* `--build-path <projectRootRelativePath>`
  * By default, `jbk-scripts` assumes you built to `dist` and looks for an `env.js` file at that location. If your build location is different, i.e. `./build`, you can declare that using this option.

`.env` options:
- each of `ENV_<key>` will replace the value of `window.env.<key>` if it exists

### **eject**

`jbk-scripts eject [options] <provider>`

eject allows you to manage your configuration yourself. This will both eject the config and install the relevant dev dependencies by default.

*Note*: If you eject configuration, you will want to periodically re-eject to catch internal configuration updates of `react-dev`. Just make sure you retain any modifications you make.

**options**:
* `--config-only`
  * By default, running eject for a provider will also eject control of the dev dependencies for that provider. For example, if you eject `prettier` it will also install `prettier` the package as a dev dependency. The `--config-only` flag will skip this step only copying out the config files themselves. This will allow you to extend `react-dev`'s configuration without managing the associated dev dependencies; future executions of related `jbk-scripts` commands will utilize your ejected config with the dev dependencies that `react-dev` retains control over.

**available ejectable providers**:
- eslint
- prettier
- babel
- webpack

**reversing eject**:

You can undo a provider ejection by completing the following:
* delete all ejected config files
  * i.e. `babel.config.js` for `babel`, etc
* uninstall ejected dev dependencies
  * i.e. `prettier` for `prettier`, etc
  * you may want to wipe out `node_modules` and install fresh
  

## Overriding Configuration

### Eslint

In order of precedence, each of the following paths will override the eslint configuration provided by `@jbknowledge/react-dev`

- `.eslintrc`
- `.eslintrc.json`
- `.eslintrc.yml`
- `.eslintrc.yaml`
- `package.json#eslintConfig`

You can reference the [eslint user guide](https://eslint.org/docs/user-guide/configuring) for how to do so.

### Prettier

In order of precedence, each of the following paths will override the prettier configuration provided by `@jbknowledge/react-dev`

- `.prettierrc`
- `.prettierrc.json`
- `.prettierrc.yaml`
- `.prettierrc.yml`
- `.prettierrc.js`
- `prettier.config.js`
- `.prettierrc.toml`
- `package.json#prettier`

You can reference [prettier's options documentation](https://prettier.io/docs/en/options.html) for how to do so.

Extension of prettier configuration is not supported at this time. If customization is desired, feel free to copy the contents of the [built in config](./src/config/prettier.yml).

### Babel

In order of precedence, each of the following paths will override the babel configuration provided by `@jbknowledge/react-dev`

- `babel.config.js`
- `.babelrc`
- `.babelrc.js`
- `package.json#babel`

You can reference the [standard babel documentation](https://babeljs.io/docs/en/configuration) for how to do so.

### Webpack

At this time, the only way to override webpack configuration provided by `@jbknowledge/react-dev` is to define a `webpack.config.js` file.

You can reference the [standard webpack documentation](https://webpack.js.org/configuration/) for how to to so.

## Contributors

`@jbknowledge/react-dev` was built and is maintained by JBKLabs, [JBKnowledge Inc's](https://jbknowledge.com/) research and development team.

## Licensing

This package is licensed under Apache License, Version 2.0. See [LICENSE](./LICENSE) for the full license text.
