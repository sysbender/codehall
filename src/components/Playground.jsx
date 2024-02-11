import React from "react";
import LiveCodes from "livecodes/react";
import ProjectSelector from "./ProjectSelector.jsx";
import ToggleAnswer from "./ToggleAnswer.jsx";
export default function Playground() {
  // code - currentCodes, finishedCodes
  // projects, selectedProject,
  const appUrl = "https://livecodes.io/";

  const view = "editor"; // result, split,
  const loading = "eager"; // lazy
  // configure object, or a url to JSON file
  const config = {
    activeEditor: "script",
    markup: {
      language: "html",
      content: "<h1>head<h1>",
    },
    style: {
      language: "css",
      content: "h1{color: red}",
    },
    script: {
      language: "python-wasm",
      console: "full",
      content: "print('hello py')",
    },
    tools: {
      enabled: ["console", "compiled"],
      active: "console",
      status: "full",
    },
  };

  //   const options = {
  //     params: {
  //       languages: "py",
  //       console: "full",
  //       py: "print('hello from python')",
  //     },
  //   };

  return (
    <div style={{ width: "50%" }}>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <ProjectSelector />
        <ToggleAnswer />
      </div>
      <LiveCodes config={config} view="split" height="600px" />
    </div>
  );
}

/**
 * props includes:
 * config, className, style, height
 *
 */
