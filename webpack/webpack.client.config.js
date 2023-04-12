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
  // mode: "production",
  mode: _isDev ? 'development' : 'production',
  // entry: getPath('src/client/index.js'),
  // entry: {//'webpack-hot-middleware/client?reload=true'
  //   main: ['webpack-hot-middleware/client?reload=true&timeout=2000', getPath('src/client/index.js')]
  // },
  // context: getPath(),
  entry: [
    'webpack-hot-middleware/client?reload=true',
    getPath('src/client/index.js'),
  ],
  // entry: ["webpack-hot-middleware/client?reload=true", getPath('src/client/index.js')],
  // entry: {
  //   // Add the client which connects to our middleware
  //   client: [getPath('src/client/index.js'), hotMiddlewareScript],
  //   // extra: ['./extra.js', hotMiddlewareScript],
  // },
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
        test: /\.(ts|tsx)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
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
          // options: swcConfig,
      },
      // { test: /\.js|jsx?$/, use: 'swc-loader', exclude: /node_modules/,  options: swcConfig,},
      { 
        test: /\.(sa|sc|c)ss$/,
        // options: {
        //   esModule: false,// => remove this would fix the reload issue
        // },
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