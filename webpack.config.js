// Needed hackery to get __filename and __dirname in ES6 mode
// see: https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-js-when-using-es6-modules
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  // output an old-style universal module for use in browsers
  {
    entry: "./src/script/main.js",
    output: {
      path: path.resolve(__dirname, "docs", "assets", "script"),
      filename: "main-umd.js",
      // library: {
      //     name: 'joiner',
      //     type: 'umd',
      //     export: 'default',
      // },
    },
  },
  // output an ES6 module
  {
    entry: "./src/script/main.js",
    // experiments: {
    //     outputModule: true,
    // },
    output: {
      path: path.resolve(__dirname, "docs", "assets", "script"),
      filename: "main-es6.js",
      // library: {
      //     type: 'module',
      // },
    },
  },
];
