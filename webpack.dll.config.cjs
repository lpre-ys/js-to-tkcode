const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: ['esprima', 'escodegen', 'estraverse', 'mithril', 'js-yaml']
  },
  output: {
    path: path.join(__dirname, 'docs/build'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: "json-loader" }
    ]
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'docs/build', '[name]-manifest.json'),
      name: '[name]_library'
    })
  ]
};
