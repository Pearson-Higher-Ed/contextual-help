// [name] under the output section denotes the entry prop names
module.exports = {
  entry: {
   dev_demo: ['webpack/hot/dev-server', './demo/src/demo.js'],
   dev_bundle: ['webpack/hot/dev-server', './main.js'],
   dist: ['./main.js']
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-id, Content-Length, X-Requested-With",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
    }
  },
  output: {
    path: './',
    filename: 'build/[name].contextual-help.js'
  },
  contentBase: "./demo", // for webpack dev server
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.html/,
        loader: 'html'
      },
    ]
  }
};
