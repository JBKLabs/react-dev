const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const { appDirectory, log } = require('../util');
const fetchConfig = require('../util/fetchConfig');
const InterpolateHtmlPlugin = require('../util/InterpolateHtmlWebpackPlugin');

const babel = fetchConfig.babel();

if (babel.configurationExists) {
  log('Babel override detected: ' + chalk.cyan(babel.token));
}

const webpackFactory = (mode) => {
  const isProduction = mode === 'production';
  const isDevelopment = mode === 'development';

  if (!isProduction && !isDevelopment) {
    throw new Error(`Invalid mode recieved: ${mode}`);
  }

  process.env.NODE_ENV = mode;
  process.env.BABEL_ENV = mode;

  return {
    mode,
    entry: path.resolve(appDirectory, 'src/index.js'),
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        react: require.resolve('react')
      }
    },
    output: {
      path: isProduction ? path.resolve(appDirectory, 'dist') : undefined,
      publicPath: '/',
      filename: 'static/js/bundle.js'
    },
    module: {
      strictExportPresence: true,
      rules: [
        { parser: { requireEnsure: false } },
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                configFile: babel.configurationExists
                  ? babel.path
                  : path.join(__dirname, './babel.js'),
                presets: [require.resolve('babel-preset-react-app')]
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [require.resolve('style-loader'), require.resolve('css-loader')]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(appDirectory, 'public/index.html')
      }),
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
        PUBLIC_URL: ''
      }),
      new webpack.HotModuleReplacementPlugin(),
      new CaseSensitivePathsPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    node: {
      module: 'empty',
      dgram: 'empty',
      dns: 'mock',
      fs: 'empty',
      http2: 'empty',
      net: 'empty',
      tls: 'empty',
      // eslint-disable-next-line camelcase
      child_process: 'empty'
    },
    devServer: {
      historyApiFallback: true,
      contentBase: path.join(appDirectory, 'public/'),
      watchContentBase: true,
      port: 8080,
      publicPath: '/',
      hot: true
    }
  };
};

module.exports = webpackFactory;
