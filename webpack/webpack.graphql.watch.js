const merge = require('webpack-merge');
const path = require('path');
const { graphQl, rootDir } = require('./webpack.base');
const devConfig = {
  watch: true,
  watchOptions: {
    aggregateTimeout: 200,
    ignored: ['node_modules']
  },
  mode: 'development',
  resolve: {
    alias: {
      '@config/environment': path.resolve(rootDir, 'src/config/environment.local')
    }
  }
};
module.exports = [merge(graphQl, { ...devConfig })];
