const path = require('path')
const address = require('address')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const tsImportPlugin = require('ts-import-plugin')
const baseConfig = require('./webpack.config.base')

module.exports = webpackMerge.merge(baseConfig, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].js',
    publicPath: `http://${address.ip()}:6002/`,
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
              // getCustomTransformers: () => ({
                // before: [tsImportPlugin({
                //   libraryName: 'antd',
                //   libraryDirectory: 'es',
                //   style: true,
                // })],
              // }),
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less)/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../client/index.html'),
    }),
  ],
  devServer: {
    port: 6002,
    contentBase: path.resolve(__dirname, '../build'),
    historyApiFallback: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    headers: { // for hmr cors
      'Access-Control-Allow-Origin': '*',
    },
    hot: true,
    overlay: true,
    stats: 'errors-only',
    watchOptions: {
      aggregateTimeout: 600,
      poll: 600,
    },
    writeToDisk: true,
  },
})
