# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased
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
