const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log("WEBPACK.CONFIG.JS RUNNING"); 

module.exports = {  
  target: 'electron-renderer', 
  entry: './src/index.js', 
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [      
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, 
        type: 'javascript/auto', 
        use: {
          loader: 'babel-loader', 
          options: {
            babelrc: false, 
            configFile: path.resolve(__dirname, 'babel.config.js'), 
          }
        },
      },
      {
        test: /\.css$/, 
        use: ['style-loader', 'css-loader'], 
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', 
      filename: 'index.html', 
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'], 
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), 
    },
    compress: true, 
    port: 9000, 
    hot: true, 
  },
}
