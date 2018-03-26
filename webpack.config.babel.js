import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import htmlTemplate from 'html-webpack-template';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const BUILD_DIR = path.resolve(__dirname, './client/dist');
const APP_DIR = path.resolve(__dirname, './client/src');

const fontLoaderConfig = {
  name: '/fonts/[name].[ext]',
  limit: 100,
};

const config = {
  entry: {
    main: `${APP_DIR}/main.jsx`,
  },
  output: {
    path: BUILD_DIR,
    filename: 'js/[name].js',
  },
  cache: true,
  devtool: 'inline-source-map',
  stats: {
    colors: true,
    reasons: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
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
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
    new HtmlWebpackPlugin({
      title: 'contact',
      xhtml: true,
      inject: false,
      template: htmlTemplate,
      appMountId: 'root-container',
      links: ['https://fonts.googleapis.com/css?family=Roboto:300,400,500'],
      meta: [
        {
          name: 'dscription',
          content: 'contact management',
        },
        {
          name: 'keyword',
          content: 'contact address',
        },
        {
          name: 'author',
          content: 'Mohamed Gassama',
        },
        {
          name: 'Content-Type',
          content: 'http-equiv',
        },
        {
          name: 'content',
          content: 'text/html; charset=UTF-8',
        },
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0',
        },
      ],
    }),
    new ExtractTextPlugin('/css/[name].css', {
      allChunks: true,
    }),
  ],

  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader',
        }),
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.(png|gif|jpg|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.ico$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              ...fontLoaderConfig,
              mimetype: 'application/font-woff',
            },
          },
        ],
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              ...fontLoaderConfig,
              mimetype: 'application/octet-stream',
            },
          },
        ],
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: fontLoaderConfig,
          },
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              ...fontLoaderConfig,
              mimetype: 'mimetype=image/svg+xml',
            },
          },
        ],
      },
    ],
  },
};

if (
  process.env &&
  process.env.NODE_ENV &&
  process.env.NODE_ENV === 'production'
) {
  const prodPlugins = [];

  config.plugins = config.plugins.concat(prodPlugins);
  config.cache = false;
  config.debug = false;
  config.devtool = undefined;
}

module.exports = config;
