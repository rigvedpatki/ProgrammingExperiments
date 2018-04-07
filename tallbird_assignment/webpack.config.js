const path = require("path");

module.exports = {
  mode: "production",
  entry: ["babel-polyfill", "./src/app.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /nodule_modules/,
        loader: "babel-loader",
        query: {
          presets: ["env", "stage-0"]
        }
      }
    ]
  },
  performance: {
    maxEntrypointSize: 1000000,
    maxAssetSize: 1000000
  }
};
