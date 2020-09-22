# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Security

- `websocket-extensions@0.1.3` --> `websocket-extensions@0.1.4` ([#54](https://github.com/JBKLabs/react-dev/pull/54))

## [0.6.0] - 2020-05-09

### Added

- `start` and `build` both allow you to specify the entry point using optional arg `--entry-point` ([#52](https://github.com/JBKLabs/react-dev/issues/52))

### Updated

- `start` and `build` no longer require `package.json#main` to be defined defaulting to "src/index.js" when undefined ([#52](https://github.com/JBKLabs/react-dev/issues/52))
- first party support for `sass` ([#41](https://github.com/JBKLabs/react-dev/issues/41))
- migrate webpack dev server off of deprecated `setup` ([#42](https://github.com/JBKLabs/react-dev/issues/42))

### Security

- `acorn@6.3.0` --> `acorn@6.4.1` ([#48](https://github.com/JBKLabs/react-dev/pull/48))

## [0.5.0] - 2020-05-01

### Updated

- `configure` logs which keys are replaced in `env.js` ([#34](https://github.com/JBKLabs/react-dev/issues/34))
- `eject` to prompt user before replacing config files which already exist ([#28](https://github.com/JBKLabs/react-dev/issues/28))
- all commands now set default values for expected environment variables ([#50](https://github.com/JBKLabs/react-dev/issues/50))

## [0.4.0] - 2019-11-21

### Added

- ability to override values in `env.js` for local development ([#38](https://github.com/JBKLabs/react-dev/issues/38))

### Fixed

- babel override now correctly looks for `babel.config.js` instead of `.babel.config.js` ([#23](https://github.com/JBKLabs/react-dev/issues/23))

### Updated

- all scripts to utilize `.env` files ([#38](https://github.com/JBKLabs/react-dev/issues/38))

## [0.3.1] - 2019-11-08

### Fixed

- problem where project docs/license/etc are not included in the published package ([#33](https://github.com/JBKLabs/react-dev/issues/33))
- `configure`'s internal reliance on `package.json` file which may or may not exist in runtime environment ([#35](https://github.com/JBKLabs/react-dev/issues/35))

## [0.3.0] - 2019-11-08

### Added

- `--build-path` option to both `build` and `configure` to support existing project's requirements ([#31](https://github.com/JBKLabs/react-dev/issues/31))

### Updated

- webpack config to utilize a `BUILD_PATH` environment variable for build output which is set by `build` automatically ([#31](https://github.com/JBKLabs/react-dev/issues/31))

## [0.2.0] - 2019-10-30

### Added

- `eject` script to individually eject one or more of `eslint`, `prettier`, `babel`, and/or `webpack` ([#25](https://github.com/JBKLabs/react-dev/issues/25))
- override support for `webpack` via `webpack.config.js` ([#25](https://github.com/JBKLabs/react-dev/issues/25))
- `find` export to utilize `react-dev`'s logic for config fetching ([#25](https://github.com/JBKLabs/react-dev/issues/25))

### Removed

- `defaults` exports for configuration extension ([#25](https://github.com/JBKLabs/react-dev/issues/25))
- `eslint` and `prettier` arg drilling through `jbk-scripts lint` ([#25](https://github.com/JBKLabs/react-dev/issues/25))

## [0.1.0] - 2019-09-26

### Added

- ability to implicitly override or explicitly extend default babel configuration ([#8](https://github.com/JBKLabs/react-dev/issues/8))
- default `eslint` and `prettier` configurations ([#16](https://github.com/JBKLabs/react-dev/issues/16))

### Updated

- `lint` command now runs both `eslint` and `prettier` ([#16](https://github.com/JBKLabs/react-dev/issues/16))
- default webpack configuration to alias `react` ([#20](https://github.com/JBKLabs/react-dev/issues/20))

## [0.0.1] - 2019-09-19

### Added

- initial `configure` script
- initial `build` script
- initial `lint` script
- initial `start` script
