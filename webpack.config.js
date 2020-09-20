const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const outputDirectory = 'dist';

module.exports = [
  // Client
  {
    entry: [
      'babel-polyfill',
      './src/client/index.js'
    ],
    output: {
      path: path.join(__dirname, outputDirectory),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    devServer: {
      port: 7788,
      open: true,
      historyApiFallback: true,
      publicPath: '/dist/',
      proxy: {
        '/api': 'http://localhost:7788'
      }
    },
    plugins: [
      new CleanWebpackPlugin([outputDirectory]),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico'
      }),
      new CopyWebpackPlugin({patterns: [
        {
          from: './public/banner.jpg',
          to: path.join(__dirname, outputDirectory, 'banner.jpg')
        }]}),
    ],
    optimization: {
      minimize: false,
    },
    watch: true,
  },
  // Server
  {
    target: 'node',
    entry: './src/server/index.js',
    externals: [nodeExternals()],
    devtool: 'inline-source-map',
    node: {
      __dirname: false,
      __filename: false
    },
    output: {
      path: path.join(__dirname, outputDirectory),
      filename: 'server.js'
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: 'ignore-loader'
        },
      ]
    },
  }
];