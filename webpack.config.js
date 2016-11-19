let path = require('path');
let webpack = require('webpack');

let CommonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: "vendor",
  minChunks: Infinity
})

module.exports = {
  entry: {
    'app': ['./src/index.js', './src/index.html'],
    'vendor': ['d3', 'jquery']
  },

  output: {
    path: './dist',
    publicPath: './dist',
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    root: [
      path.resolve('./src')
    ],

    extensions: ['', '.js', '.json', '.css', '.html']
  },

  devtool: 'source-map',
  debug: true,

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },

  plugins: [CommonsChunkPlugin]
}