import path from "path";
import { glob } from "glob";
import { fileURLToPath } from "node:url";
import fs from "fs";
import __dirname from "./__dirname.js";
import {
  findConfigFiles,
  generateConfig,
  getFilesInDir,
  findHtmlFiles,
} from "./webpack.util.js";

import showdown from "showdown";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// import the Webpack copy plugin
import CopyPlugin from "copy-webpack-plugin";

// process project
//const HtmlWebpackPlugin = require("html-webpack-plugin");
import HtmlWebpackPlugin from "html-webpack-plugin";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";

//let htmlPageNames = ["main", "sub/sub"];

function mdToHtml(mdContent) {
  const converter = new showdown.Converter();
  return converter.makeHtml(mdContent);
}
// when deploy, not transform index which will be done by gh-pages
const notTransformIndex = process.env.NOT_TRANSFORM_INDEX
  ? []
  : [
      {
        from: "src/index.md",
        to: "index.html",
        transform(content, absoluteFrom) {
          console.log(
            "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% absoluteFrom = ",
            absoluteFrom
          );
          return mdToHtml(content.toString());
        },
      },
    ];

const confFilePath =
  "D:\\workspace\\codehall\\src\\apps\\demo\\demo1\\config.json";
const files = getFilesInDir(confFilePath);
const filePath = path.dirname(confFilePath);
console.log("=====files =", files);
const conf = generateConfig(filePath, files);
console.log("===============conf=", conf);

//=======================================================================
// getConfigFileContent(
//   "D:\\workspace\\codehall\\src\\apps\\demo\\reactjs\\config.json"
// );

let configFiles = findConfigFiles();
let htmlPageNames = findHtmlFiles();

let multipleHtmlPlugins = htmlPageNames.map((name) => {
  return new HtmlWebpackPlugin({
    //template: `./src/${name}.html`, // relative path to the HTML files
    template: `./src/apps/${name}`, // relative path to the HTML files
    inject: true,
    //filename: `${name}.html`, // output HTML files
    filename: `apps/${name}`, // output HTML files
    // chunks: [`${name}`], // respective JS files
  });
});

const wpApp = {
  plugins: [
    // new FaviconsWebpackPlugin("./src/assets/img/favicon.ico"),
    // new HtmlWebpackPlugin({
    //   favicon: "./src/assets/img/favicon.ico",
    // }),
    new CopyPlugin({
      patterns: [
        { from: "src/index.md", to: "index.md" },
        {
          from: "src/",
          to: "./",
          globOptions: { ignore: ["**/index.html", "**/config.json"] },
        },
      ].concat(notTransformIndex),
    }),
  ].concat(multipleHtmlPlugins),
};

export default wpApp;
