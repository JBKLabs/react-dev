# JBKnowledge React Development

## Installation

```bash
npm install @jbknowledge/eslint-config
npm install @jbknowledge/react-dev
```

**package.json**
```json
{
  "scripts": {
    "lint": "jbk-scripts lint .",
    "start": "jbk-scripts start"
  },
  "eslintConfig": {
    "extends": ["@jbknowledge"]
  }
}
```

## Overriding Configuration

### Eslint

In order of precedence, each of the following paths will override the eslint configuration provided by `@jbknowledge/react-dev`

- `jbk-scripts lint --eslint-config <rootRelativePath>`
- `.eslintrc`
- `.eslintrc.json`
- `.eslintrc.yml`
- `package.json#eslintConfig`

You can reference the [eslint user guide](https://eslint.org/docs/user-guide/configuring) for how to do so.

If you want to extend the configuration provided by `@jbknowledge/react-dev` rather than replace it, extend `@jbknowledge` in your config file like the following:

```yml
extends:
  - '@jbknowledge'
rules:
  ...
```

### Prettier

TODO

### Babel

In order of precedence, each of the following paths will override the babel configuration provided by `@jbknowledge/react-dev`

- `.babelrc`
- `.babelrc.js`
- `.babel.config.js`
- `package.json#babel`

You can reference the [standard babel documentation](https://babeljs.io/docs/en/configuration) for how to do so.

If you want to extend the configuration provided by `@jbknowledge/react-dev` rather than replace it, import `config.babel` from `@jbknowledge/react-dev` like the following:

```js
const { babel } = require('@jbknowledge/react-dev');

module.exports = {
  presets: babel.presets.default,
  // etc
}
```

`config.babel` has the following schema at this time:

```json
{
  "presets": {
    "default": [...presets],
  },
  "plugins": {
    "default": [...plugins],
    "byName": {
      [pluginName]: {...pluginSettings}
    }
  }
}
```

### Webpack

TODO

## Contributors

`@jbknowledge/react-dev` was built and is maintained by JBKLabs, [JBKnowledge Inc's](https://jbknowledge.com/) research and development team.

## Licensing

This package is licensed under Apache License, Version 2.0. See [LICENSE](./LICENSE) for the full license text.