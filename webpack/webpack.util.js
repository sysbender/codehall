//util
import __dirname from "./__dirname.js";
import path from "path";
import { glob } from "glob";
import fs from "fs";

function getFileContent(filePath) {
  return fs.readFileSync(filePath, "utf8");
}
// 'demo/demo1/config.json'
function findConfigFiles() {
  const srcPath = path.resolve(__dirname, "src", "apps");
  const destPath = path.resolve(__dirname, "docs", "apps");
  const configFiles = glob.sync("**/config.json", { cwd: srcPath });

  const files = [];

  configFiles.forEach((file) => {
    let fileRelativePath = file.replace(/\\/g, "/");
    const fileSrcPath = path.normalize(path.join(srcPath, file));
    const fileDestPath = path.normalize(path.join(destPath, file));
    files.push({ fileRelativePath, fileSrcPath, fileDestPath });
  });
  console.log("$$$$$$$$$$$$$$$$$$ config files =", files);
  return files;
}

function getFilesInDir(fileSrcPath) {
  const excludeFiles = new Set(["index.html", "index.js"]);
  const fileSrcDir = path.dirname(fileSrcPath);
  console.log("-------------------- fileSrcDir", fileSrcDir);
  const files = fs.readdirSync(fileSrcDir).filter((fileName) => {
    const filePath = path.join(fileSrcDir, fileName);
    return !excludeFiles.has(fileName) && fs.statSync(filePath).isFile();
  });
  console.log("==============================", files);
  return files;
}

function generateConfig(dirPath, files) {
  const basenames = files.reduce((accumulator, currValue, currIndex) => {
    return accumulator.add(path.basename(currValue));
  }, new Set([]));

  const markupExts = new Map([
    [".md", "markdown"],
    [".html", "html"],
  ]);
  const styleExts = new Map([[".css", "css"]]);
  const scriptExts = new Map([
    [".js", "javascript"],
    [".py", "python-wasm"],
    [".py3", "python-wasm"],
  ]);

  const scriptFiles = files.filter((file) =>
    scriptExts.has(path.extname(file))
  );
  console.log("========scriptFiles", scriptFiles);

  let configs = [];
  for (const scriptFile of scriptFiles) {
    const script = {
      filename: scriptFile,
      language: scriptExts.get(path.extname(scriptFile)),
      content: getFileContent(path.join(dirPath, scriptFile)),
    };
    console.log(" =============script", scriptFile, script);
    // todo : add markup and style
    configs.push(script);
  }

  return configs;
}

// 'demo/demo1/index.html'
function findHtmlFiles() {
  const srcPath = path.resolve(__dirname, "src", "apps");
  const destPath = path.resolve(__dirname, "docs", "apps");
  const htmlFiles = glob.sync("**/index.html", { cwd: srcPath });

  const files = [];

  htmlFiles.forEach((file) => {
    let f2 = file.replace(/\\/g, "/");
    files.push(f2);
  });
  console.log("$$$$$$$$$$$$$$$$$$ files =", files);
  return files;
}

export { findConfigFiles, generateConfig, getFilesInDir, findHtmlFiles };
