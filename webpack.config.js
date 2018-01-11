var path = require('path');
var webpack = require('webpack');
var NODE_MODULES_PATH = path.resolve(__dirname, 'node_modules');

module.exports = {
  devtool: 'eval',
  context: path.resolve(__dirname, './src'),
  entry: [
    './index.js'
  ],
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'index.js',
    publicPath:'/lib',
    library: 'commontable'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
      __CLIENT__: JSON.stringify(true),
      __SERVER__: JSON.stringify(false),
    }),
    // Minimize all JavaScript output of chunks
    // https://github.com/mishoo/UglifyJS2#compressor-options
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
        drop_console: true,
        screw_ie8: true
      },
      output: {
        comments: false
      }
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.css/,
        loaders: [
          'style-loader',
          `css-loader?${JSON.stringify({
            sourceMap: false,
            modules: true,
            localIdentName:'[hash:base64:5]',
            minimize: true,
          })}`
        ],

      },
      { test: /\.less$/,loader: 'style!css?modules!less' },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: NODE_MODULES_PATH,

      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  }
};
