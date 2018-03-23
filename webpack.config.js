const path = require('path');
const WebpackAutoInject = require('webpack-auto-inject-version');

module.exports = {
  entry: './client/application.js',
  module: {
    rules: [{ test: /\.js$/, include: /client/, loader: "babel-loader" }]
  },
  plugins: [ new WebpackAutoInject({
    components: { AutoIncreaseVersion: true },
    componentsOptions: { AutoIncreaseVersion: { runInWatchMode: true } }
  }) ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/scripts')
  }
};