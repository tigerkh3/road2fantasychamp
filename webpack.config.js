const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "client", "src", "index.jsx"),
  output: {
    path: path.resolve(__dirname, "client", "src", "dist"),
    filename: "bundle.js"
  },
  devServer: {
    static: path.resolve(__dirname, "client", "src", "dist"),
    hot: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      }
    ]
  },
  // anything else below here
}
