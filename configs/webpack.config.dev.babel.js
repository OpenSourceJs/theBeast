import merge from 'webpack-merge';
import common from './webpack.config.common.babel';
import chalk from 'chalk';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';

const clientDev = {
  mode: 'development',
  plugins: [
    new ProgressBarPlugin({
      format:
        '  Build [:bar] ' +
        chalk.green.bold(':percent') +
        ' (:elapsed seconds)',
      clear: false,
    }),
  ],
};

const serverDev = {
  mode: 'development',
  target: 'node',
  plugins: [
    new ProgressBarPlugin({
      format:
        '  Build [:bar] ' +
        chalk.green.bold(':percent') +
        ' (:elapsed seconds)',
      clear: false,
    }),
  ],
};

export default [
  merge(common.clientConfig, clientDev),
  merge(common.serverConfig, serverDev),
];
