const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/script.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html' }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, './styles', 'style.css'), to: path.resolve(__dirname, './dist/styles') },
        { from: path.resolve(__dirname, './assets'), to: path.resolve(__dirname, './dist/assets') },
      ],
    }),
  ],
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