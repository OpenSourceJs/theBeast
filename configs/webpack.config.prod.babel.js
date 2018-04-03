import webpack from 'webpack';
import merge from 'webpack-merge';
import OfflinePlugin from 'offline-plugin';
import CompressionWebpackPlugin from 'compression-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import common from './webpack.config.common.babel';

const clientProd = {
  mode: 'production',
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },

  module: {
    rules: [
      // sass
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [autoprefixer('last 2 version')],
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
    ],
  },

  plugins: [
    // clean dist folder
    new CleanWebpackPlugin(['dist'], { root: ROOT_DIR }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin({
      filename: 'styles.[hash].css',
      allChunks: false,
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'theme/img/favicon.ico',
      inject: true,
      sourceMap: true,
      chunksSortMode: 'dependency',
    }),
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(js|css)$'),
      threshold: 10240,
      minRatio: 0.8,
    }),
    new OfflinePlugin({
      caches: 'all',
      AppCache: false,
    }),
  ],
};

const serverProd = {
  mode: 'production',
  target: 'node',
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
};

if (process.env.NODE_ANALYZE) {
  clientProd.plugins.push(new BundleAnalyzerPlugin()) &&
    serverProd.plugins.push(new BundleAnalyzerPlugin());
}

export default [
  merge(common.clientConfig, clientProd),
  merge(common.serverConfig, serverProd),
];
