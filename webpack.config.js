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
      // babel loaders here
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["module:react-native-dotenv"]
          }
        }
      },
      // css loaders here
      {
        test: /\.(css)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
        ]
      }
    ]
  },
  // css loaders here
}
