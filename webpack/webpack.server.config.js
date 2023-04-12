const path = require('path')
const fs = require('fs');
const { resolve } = require('path');
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = () => !['production', 'test'].includes(process.env.NODE_ENV);
const _isDev = isDev();
const getPath = (...args) => resolve(process.cwd(), ...args);

const swcConfig = JSON.parse(fs.readFileSync(getPath('.swcrc'), 'utf-8'));
swcConfig.jsc.transform.react.development = _isDev;
swcConfig.sourceMaps = _isDev;
swcConfig.minify = !_isDev;

const serverConfig = {
  mode: _isDev ? 'development' : 'production',
  entry: getPath('src/server/index.js'),
  target: 'node',
  // globals: {
  //   __SERVER__: true,
  //   __DEV__: false,
  // },
  externals: [nodeExternals()],
  resolve: {
    alias: {
      process: "process/browser",
      root: getPath('src/server')
    },
    fallback: {
      'util': require.resolve('util/'),
      'assert': require.resolve('assert/'),
      'process': require.resolve('process/'),
      'buffer': require.resolve('buffer/')
       }
  },
  output: {
    path: getPath('dist'),
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        test: /\.js|jsx?$/,
        exclude: /node_modules/,
        loader: 'swc-loader',
        options: swcConfig,
      },
      {
        test: /\.(png|jp(e*)g|gif|webp|avif)$/,
        use: ['file-loader'],
      },
      // { test: /\.(js)$/, use: 'swc-loader', exclude: /node_modules/, options: swcConfig, },
      // { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] }
      { 
        test: /\.(sa|sc|c)ss$/,
        // options: {
        //   esModule: false,// => remove this would fix the reload issue
        // },
        use: [
          _isDev ? "style-loader" : MiniCssExtractPlugin.loader,//SSR
          "css-loader",
          "sass-loader",
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      __isBrowser__: "false",
      __CLIENT__: "false",
      __SERVER__: "true",
      __DEV__: _isDev,
    }),
   
  ]
}

module.exports =  serverConfig