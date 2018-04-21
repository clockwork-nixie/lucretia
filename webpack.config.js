const path = require('path');
const WebpackAutoInject = require('webpack-auto-inject-version');

module.exports = {
  entry: {
    console: ['babel-polyfill', './client/console.js'],
    gui: ['babel-polyfill', './client/application.js'],

  },
  module: {
    rules: [{ test: /\.js$/, include: /client/, loader: "babel-loader" }]
  },
  plugins: [ new WebpackAutoInject({
    components: { AutoIncreaseVersion: true },
    componentsOptions: { AutoIncreaseVersion: { runInWatchMode: true } }
  }) ],
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'public/scripts')
  }
};