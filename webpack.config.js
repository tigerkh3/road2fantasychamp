const path = require("path");

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "client", "src", "index.jsx"),
  output: {
    path: path.resolve(__dirname, "client", "src", "dist"),
    filename: "bundle.js"
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
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
          loader: "file-loader"
          }
        ]
      }
    ]
  },
  // css loaders here
}
