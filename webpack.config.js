let path = require('path');
let webpack = require('webpack');

let CommonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: "vendor",
  minChunks: Infinity
})


function option(argument) {
  return process.argv.find(argument);
}


let entry = {
  'app': ['./src/index.js', './src/index.html', './src/cac_champagne.ttf'],
  'vendor': ['d3', 'jquery', 'material-design-lite']
}


module.exports = {
  entry: entry,

  output: {
    path: './dist',
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    root: [
      path.resolve('./src')
    ],

    extensions: ['', '.js', '.json', '.css', '.html', '.ttf']
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
        loader: 'file-loader?name=[name].[ext]!extract-loader!html-loader?attrs=link:href'
      },
      {
        test: /\.css$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.ttf$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },

  plugins: [CommonsChunkPlugin]
}