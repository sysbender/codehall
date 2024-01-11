// Needed hackery to get __filename and __dirname in ES6 mode
// see: https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-js-when-using-es6-modules
import path from "node:path";
import { glob } from "glob";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// import the Webpack copy plugin
import CopyPlugin from "copy-webpack-plugin";
// multiple HTML files

//const HtmlWebpackPlugin = require("html-webpack-plugin");
import HtmlWebpackPlugin from "html-webpack-plugin";

//let htmlPageNames = ["main", "sub/sub"];

function getHtmlFiles() {
  const srcPath = path.resolve(__dirname, "src", "apps");
  const destPath = path.resolve(__dirname, "docs", "apps");
  const htmlFiles = glob.sync("**/index.html", { cwd: srcPath });

  const files = [];

  htmlFiles.forEach((file) => {
    // const entryName = path.basename(file, ".html");
    // const entryPath = path.resolve(srcPath, file);
    // let relativePath = path.relative(srcPath, file);
    // let a1 = path.resolve(destPath, relativePath);
    // console.log("file=", file);
    // console.log("a1=", a1);
    // let r1 = path.relative( )

    // let p1 = relativePath; //  .replace(/\\/g, "/");
    // console.log(` relative = `, srcPath, p1);
    // let p2 = p1.split(path.sep);
    // let p3 = p2.slice(1);
    // let p4 = p3.join("/");

    let f2 = file.replace(/\\/g, "/");
    files.push(f2);
  });
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@files=", files);
  return files;
}
let htmlPageNames = getHtmlFiles();

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

// export the Webpack config
export default {
  entry: "./src/assets/script/main.js",
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "assets/script/bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/index.md", to: "index.md" },
        {
          from: "src/",
          to: "./",

          globOptions: { ignore: ["**/index.html"] },
        },
      ],
    }),
  ].concat(multipleHtmlPlugins),
};
