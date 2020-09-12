const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInjectPlugin = require('html-webpack-inject-plugin').default
// TODO: ant_design
// const tsImportPlugin = require('ts-import-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const baseConfig = require('./webpack.config.base')

module.exports = webpackMerge.merge(baseConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist/build'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[contenthash].js',
    // TODO: upload_to_cdn if you dont use asset cdn, change value to '/build/'
    publicPath: '[your-cdn-path-prefix-where-you-put-your-built-files]',
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    namedModules: true,
    namedChunks: true,
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              // TODO: ant_design
              // getCustomTransformers: () => ({
                // before: [tsImportPlugin({
                //   libraryName: 'antd',
                //   libraryDirectory: 'es',
                //   style: 'css',
                // })],
              // }),
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css|\.less/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../client/index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new HtmlWebpackInjectPlugin({
      externals: [
        { tag: 'script', attrs: { src: 'https://cdn.staticfile.org/bluebird/3.7.2/bluebird.min.js' } },
        { tag: 'script', attrs: { src: 'https://cdn.staticfile.org/react/16.13.1/umd/react.production.min.js' } },
        { tag: 'script', attrs: { src: 'https://cdn.staticfile.org/react-dom/16.13.1/umd/react-dom.production.min.js' } },
        { tag: 'script', attrs: { src: 'https://cdn.staticfile.org/react-router-dom/5.2.0/react-router-dom.min.js' } },
        { tag: 'script', attrs: { src: 'https://cdn.staticfile.org/lodash.js/4.17.19/lodash.min.js' } },
        { tag: 'script', attrs: { src: 'https://cdn.staticfile.org/moment.js/2.27.0/moment.min.js' } },
        { tag: 'script', attrs: { src: 'https://cdn.staticfile.org/axios/0.20.0/axios.min.js' }},
      ],
      parent: 'body',
      prepend: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],
  externals: {
    'bluebird': 'Promise',
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
    lodash: '_',
    moment: 'moment',
    axios: 'axios',
  },
})
