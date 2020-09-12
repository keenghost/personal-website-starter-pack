const path = require('path')

module.exports = {
  entry: {
    app: [path.join(__dirname, 'index.tsx')],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  stats: {
    assets: true,
    colors: true,
    hash: false,
    chunks: false,
    modules: false,
    version: false,
    children: false,
    entrypoints: false,
  },
}
