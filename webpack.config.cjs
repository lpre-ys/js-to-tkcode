var path = require('path');
var webpack = require('webpack');
var current = process.cwd();

module.exports = {
  entry: {
    app: './js/front/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'docs/build'),
    filename: '[name].bundle.js'
  },
  resolve: {
    modules: [path.join(current, './js'), 'node_modules']
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./docs/build/vendor-manifest.json')
    })
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
