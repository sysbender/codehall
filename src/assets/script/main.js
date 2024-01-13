//import { createPlayground } from "https://unpkg.com/livecodes@0.3.0";
// import { showdown } from "https://unpkg.com/showdown@2.1.0";
import { createPlayground } from "livecodes";
import * as showdown from "showdown";
import { createConfigOptions } from "./util.js";
import { createCodeProject } from "./createCodeProject.js";
import "../style/style.css";

// resize  sidebar

try {
  const sidebar = document.querySelector(".sidebar");
  const mainContent = document.querySelector(".main-content");
  document.querySelector("button").onclick = function () {
    sidebar.classList.toggle("sidebar_small");
    mainContent.classList.toggle("main-content_large");
  };
} catch (err) {
  console.error("failed to setup resizing sidebar");
}
//----------------------end of resize

const converter = new showdown.Converter({
  simplifiedAutoLink: true,
  tasklists: true,
  tables: true,
  strikethrough: true,
});
const text = "* [ ] hello, markdown!";
const htmlContent = converter.makeHtml(text).replaceAll("disabled", "");

const target = document.getElementById("description");
target.innerHTML = htmlContent;

// read project config

const codeProject = createCodeProject();
const versions = await codeProject.getVersions();

const conf = await codeProject.getLiveCodesConfig(versions[0]);

// const config1 = {
//   markup: {
//     language: "markdown",
//     content: "# Hello LiveCodes!",
//   },
//   style: {
//     language: "css",
//     content: "body { color: blue; }",
//   },
//   script: {
//     language: "javascript",
//     content: 'console.log("hello from JavaScript!");',
//   },
//   activeEditor: "script",
// };
//let projectConfig = await fetchProjectFiles("starter.json");
const projectConfig = Object.assign({}, conf);
projectConfig.activeEditor = "script";

const config = structuredClone(projectConfig);

const playground = await createPlayground("#playground", {
  config,
  params: { console: "open" },
});

createConfigOptions(
  "configContainer",
  await codeProject.getVersions(),
  handleSelectConfig
);

refreshProject();

async function handleSelectConfig(name) {
  const newConfig = await codeProject.getLiveCodesConfig(name);
  await playground.setConfig(newConfig);
  await refreshProject();
  // update url and description
}

// refresh current project url and description
async function refreshProject() {
  const currentVersion = document.getElementById("configContainer").value;

  const url = await codeProject.getUrl(currentVersion);
  document.getElementById("url").href = url;
  const desc = await codeProject.getDescription(currentVersion);
  document.getElementById("description").innerHTML = desc;
}

// async function currentSelectConfig() {}

// await playground.setConfig({
//   // new config options
// });
