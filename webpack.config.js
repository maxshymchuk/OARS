const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/script.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './')
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.worker\.ts$/,
        loader: 'worker-loader',
      },
      { 
        test: /\.ts$/, 
        loader: 'ts-loader' 
      }
    ]
  }
}