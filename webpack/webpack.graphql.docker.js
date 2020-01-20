const merge = require('webpack-merge');
const path = require('path');
const { graphQl, rootDir } = require('./webpack.base');
const devConfig = {
  mode: 'development',
  resolve: {
    alias: {
      '@config/environment': path.resolve(rootDir, 'src/config/environment.docker')
    }
  }
};
module.exports = [merge(graphQl, { ...devConfig })];
