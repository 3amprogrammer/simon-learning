const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const projectsJsonPath = path.join(__dirname, 'projects.config.json');
const projectsData = fs.readFileSync(projectsJsonPath, 'utf-8');
const projects = JSON.parse(projectsData).projects;

const plugins = projects.map(module => new HtmlWebpackPlugin({
  filename: `${module}/index.html`,
  template: `./src/${module}/index.html`,
  chunks: [module],
}));

const entryPoints = projects.reduce((acc, module) => {
  acc[module] = `./src/${module}/app.js`;
  return acc;
}, {});

module.exports = {
  entry: entryPoints,
  output: {
    filename: '[name]/app.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: `./src/index.html`,
    }),
    ...plugins,
  ],
  devServer: {
    static: './dist',
    hot: true,
    watchFiles: ['src/**/*.html'],
  },
  mode: 'development',
};
