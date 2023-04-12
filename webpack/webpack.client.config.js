const path = require('path')
const fs = require('fs');
const { resolve } = require('path');
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== "production";

const isDev = () => !['production', 'test'].includes(process.env.NODE_ENV);
const _isDev = isDev();
const getPath = (...args) => resolve(process.cwd(), ...args);

const swcConfig = JSON.parse(fs.readFileSync(getPath('.swcrc'), 'utf-8'));
swcConfig.jsc.transform.react.development = _isDev;
swcConfig.sourceMaps = _isDev;
swcConfig.minify = !_isDev;
const hotMiddlewareScript ='webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';


const browserConfig = {
  mode: _isDev ? 'development' : 'production',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    getPath('src/client/index.js'),
  ],
  devServer: {
    static: getPath('dist'),
    hot: true,
  },
  output: {
    path: getPath('dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(png|jp(e*)g|gif|webp|avif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
          test: /\.js|jsx?$/,
          exclude: /node_modules/,
          loader: 'swc-loader',
          options: swcConfig,
      },
      { 
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,//SSR
          "css-loader",
          "sass-loader",
        ],
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true",
      __CLIENT__: "true",
      __SERVER__: "false",
      __DEV__: _isDev,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ].concat(devMode ? [] : [MiniCssExtractPlugin.loader])
}

module.exports = browserConfig