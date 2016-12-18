var path = require('path');
var webpack = require('webpack');
var current = process.cwd();

module.exports = {
  entry: {
    app: './js/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  resolve: {
    root: path.join(current, './js')
  },
  module: {
    loaders:[
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   query: {
      //     plugins: ['transform-es2015-modules-commonjs']
      //   }
      // },
      { test: /\.json$/, loader: "json-loader" }
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./build/vendor-manifest.json')
    })
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
