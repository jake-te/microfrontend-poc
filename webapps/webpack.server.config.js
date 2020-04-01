const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/server.js',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ENDPOINT_SERVER_URL': "'http://app.local.microfrontend:2222'",
      'process.env.REVENUE_SERVER_URL': "'http://app.local.microfrontend:3333'",
    })
  ]
};
