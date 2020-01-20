const glob = require('glob');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const { SamWebpackPlugin } = require('sam-webpack-plugin');

const rootDir = path.join(__dirname, '..');

/**
 * Utility function to get all files batching the provided pattern
 */
const getEntries = patterns => {
  const entries = {};
  patterns.forEach(pattern => {
    glob.sync(pattern).forEach(file => {
      entries[file.replace('src/', '')] = path.join(rootDir, file);
    });
  });

  return entries;
};
/**
 * base build
 */
const baseDeployment = 'dist';

/**
 * mtgnorth external names
 */
const GLOBALS = '@global';
const BeUtil = '@util';
const BeServices = '@services';
const BeEnv = '@config';

/**
 * mtgnorth external imports
 */
const projectExternals = [GLOBALS, BeUtil, BeServices, BeEnv];

/**
 * mtgnorth specific aliases
 */
const aliases = {
  [GLOBALS]: path.resolve(rootDir, 'src/global'),
  [BeUtil]: path.resolve(rootDir, 'src/util'),
  [BeServices]: path.resolve(rootDir, 'src/services'),
  [BeEnv]: path.resolve(rootDir, 'src/config')
};

/**
 * default ts transform rules
 */
const tsRule = {
  test: /\.ts?$/,
  use: [
    {
      loader: 'babel-loader'
    }
  ],
  exclude: [/node_modules/]
};

const graphQl = {
  mode: 'none',
  entry: {
    graphFunction: path.resolve(rootDir, 'src/graphql/graphFunction.ts'),
    express: path.resolve(rootDir, 'src/graphql/express.ts')
  },
  externals: [nodeExternals()],
  target: 'node',
  module: {
    rules: [tsRule]
  },
  resolve: {
    extensions: ['.ts'],
    alias: aliases
  },
  output: {
    library: 'graphql api',
    libraryTarget: 'umd',
    filename: chunkData => `${chunkData.chunk.name.replace('.ts', '')}.js`,
    path: path.resolve(rootDir, `${baseDeployment}`, 'graphql')
  },
  plugins: [
    new SamWebpackPlugin({
      output: './graphql-sam-deploy',
      baseTemplate: path.resolve(rootDir, 'template.json')
    })
  ]
};

module.exports = {
  rootDir,
  getEntries,
  baseDeployment,
  tsRule,
  graphQl,
  projectExternals
};
