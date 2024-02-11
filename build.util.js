/**
 * recursive scan path
 * exclude index.js, index.html,
 * generateProjectConfig for each folder
 */
function generateProjectConfig() {}

function getHtmlFiles() {
  const srcPath = path.resolve(__dirname, "src", "apps");
  const destPath = path.resolve(__dirname, "docs", "apps");
  const htmlFiles = glob.sync("**/index.html", { cwd: srcPath });

  const files = [];

  htmlFiles.forEach((file) => {
    let f2 = file.replace(/\\/g, "/");
    files.push(f2);
  });
  return files;
}
let htmlPageNames = getHtmlFiles();
