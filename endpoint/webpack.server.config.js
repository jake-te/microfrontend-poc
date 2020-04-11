const webpack = require('webpack');
const path = require('path');

const gitUtils = require('./gitUtils');

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
      'process.env.GIT_REVISION_SHORT': `'${gitUtils.getCurrentShortGitRevision()}'`,
    })
  ]
};
