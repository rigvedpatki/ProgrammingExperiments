const path = require("path");

const DIST_DIR = path.resolve(__dirname, "dist");
const SRC_DIR = path.resolve(__dirname, "src");

const config = {
  mode: "development",
  entry: path.join(SRC_DIR, "/app/index.js"),
  output: {
    path: path.join(DIST_DIR, "/app"),
    filename: "bundle.js",
    publicPath: "/app/"
  },
  module: {
    rules: [
      {
        test: /\.js/,
        include: SRC_DIR,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015", "stage-2"]
        }
      }
    ]
  }
};

module.exports = config;
