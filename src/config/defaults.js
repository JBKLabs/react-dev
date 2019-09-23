const babelPlugins = {
  'babel-plugin-module-resolver': {
    path: require.resolve('babel-plugin-module-resolver'),
    options: {
      root: ['.'],
      alias: {
        '~': '.',
        src: './src'
      }
    }
  }
};

const babel = {
  presets: {
    default: [
      require.resolve('@babel/preset-env'),
      require.resolve('@babel/preset-react')
    ],
  },
  plugins: {
    default: [
      [
        babelPlugins['babel-plugin-module-resolver'].path,
        { ...babelPlugins['babel-plugin-module-resolver'].options }
      ]
    ],
    byName: babelPlugins
  }
};

module.exports = {
  babel
};