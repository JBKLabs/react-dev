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

start will spin up a webpack dev server on your behalf.

available overrides:
- webpack config
- babel config

### **build**

`jbk-scripts build`

build will generate a production bundle of your site and output to `dist/*`.

available overrides:
- webpack config
- babel config

### **configure**

`jbk-scripts configure`

configure will inject `ENV_*` into your `public/env.js` file for releases.

### **eject**

`jbk-scripts eject [options] <provider>`

eject allows you to manage your configuration yourself. This will both eject the config and install the relevant dev dependencies by default.

options:
* `--config-only`: Skip ejecting dev dependencies

available ejectable providers:
- eslint
- prettier
- babel
- webpack

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
