// Needed hackery to get __filename and __dirname in ES6 mode
// see: https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-js-when-using-es6-modules
import path from "node:path";
import { glob } from "glob";
import { fileURLToPath } from "node:url";
import __dirname from "./__dirname.js";

import showdown from "showdown";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// multiple HTML files

import FaviconsWebpackPlugin from "favicons-webpack-plugin";

// export the Webpack config
const wpCommon = {
  mode: "development",
  // entry: "./src/assets/script/main.js",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "assets/script/bundle.js",
  },
  watchOptions: {
    aggregateTimeout: 600,
    ignored: "**/node_modules",
    poll: 1000, // Check for changes every second
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new FaviconsWebpackPlugin("./src/assets/img/favicon.ico")],
  target: "web",
  devServer: {
    watchFiles: { paths: ["src/**/*"] },
    static: {
      directory: path.join(__dirname, "docs"),
      watch: true,
    },
    port: 9000,
    hot: true,
  },
  devtool: "source-map",
};

export default wpCommon;
