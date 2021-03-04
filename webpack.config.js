const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash:8].css',
    }),
  ],
  devtool: process.env.NODE_ENV ? 'suurce-map' : 'inline-source-map',
  devServer: {
    port: 8000,
  },
  output: {
    filename: '[name].[contenthash:8].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: [/node_modules/],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, 'node_modules/@ckeditor'),
        use: [
          'vue-style-loader',
          'style-loader',
          // MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: ['raw-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[contenthash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[contenthash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag',
              attributes: {
                'data-cke': true,
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: styles.getPostCssConfig({
              themeImporter: {
                themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
              },
              minify: true,
            }),
          },
        ],
      },
    ],
  },
  resolve: {
    symlinks: false,
    extensions: ['.vue', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  performance: { hints: false },
};
