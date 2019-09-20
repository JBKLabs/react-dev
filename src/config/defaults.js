const unformattedBabelPlugins = {
  'babel-plugin-module-resolver': {
    path: require.resolve('babel-plugin-module-resolver'),
    root: ['.'],
    alias: {
      '~': '.',
      src: './src'
    }
  }
}

const babel = {
  presets: [
    require.resolve('@babel/preset-env'),
    require.resolve('@babel/preset-react')
  ],
  plugins: {
    'babel-plugin-module-resolver': {
      formatted: [
        unformattedBabelPlugins['babel-plugin-module-resolver'].path,
        {
          root: unformattedBabelPlugins['babel-plugin-module-resolver'].root,
          alias: unformattedBabelPlugins['babel-plugin-module-resolver'].alias
        }
      ],
      opt: unformattedBabelPlugins['babel-plugin-module-resolver']
    }
  }
};

module.exports = {
  babel
};