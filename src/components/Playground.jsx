import React, { useEffect, useState } from "react";
import LiveCodes from "livecodes/react";
import ProjectSelector from "./ProjectSelector.jsx";
import ToggleAnswer from "./ToggleAnswer.jsx";
// import {
//   extractPythonComments,
//   extractJavascriptComments,
// } from "../utils/extractCommets.js";

const demoConfig = {
  activeEditor: "script",
  // markup: {
  //   language: "html",
  //   content: "<h1>head<h1>",
  // },
  // style: {
  //   language: "css",
  //   content: "h1{color: red}",
  // },
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

export default function Playground({ projectConfigs }) {
  const projectNames = projectConfigs.map((script) => script.filename);
  // const config = demoConfig;
  const [selectedProjectName, setSelectedProjectName] = useState(
    projectConfigs[0]?.filename
  );

  const [isLiveCodesReady, setIsLiveCodesReady] = useState(false);

  const [liveCodesConfig, setLiveCodesConfig] = useState(
    generateLiveCodesConfig(projectConfigs, selectedProjectName)
  );
  console.log("===========projectNames", projectNames);
  console.log("====================selected ProjectName", selectedProjectName);

  useEffect(() => {
    setLiveCodesConfig(
      generateLiveCodesConfig(projectConfigs, selectedProjectName)
    );
    setIsLiveCodesReady(true);
  }, [projectConfigs, selectedProjectName]);

  // const liveCodeConfig = generateLiveCodesConfig(
  //   projectConfigs,
  //   selectedProjectName
  // );

  const [showAnswer, setShowAnswer] = useState(false);

  console.log("=============config number", projectConfigs.length);
  // code - currentCodes, finishedCodes
  // projects, selectedProject,
  const appUrl = "https://livecodes.io/";

  const view = "editor"; // result, split,
  const loading = "eager"; // lazy
  // configure object, or a url to JSON file

  //   const options = {
  //     params: {
  //       languages: "py",
  //       console: "full",
  //       py: "print('hello from python')",
  //     },
  //   };

  function generateLiveCodesConfig(confs, projectName, showAnswer) {
    // get   language, content from projectName

    const projectConfig = confs.find(
      (script) => script.filename === projectName
    );

    console.log(
      "=========&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&=======confs",
      projectConfig
    );
    const { filename, language, content } = projectConfig;

    // const newContent = content;
    // if (!showAnswer) {
    //   if (language === "javascript") {
    //     newContent = extractJavascriptComments(content);
    //   } else {
    //     newContent = extractPythonComments(content);
    //   }
    // }

    return {
      activeEditor: "script",
      script: {
        language,
        console: "full",
        content,
      },
      tools: {
        enabled: ["console", "compiled"],
        active: "console",
        status: "full",
      },
    };
  }

  //=---------------------
  // function onLiveCodesReady(playground) {
  //   playground.setConfig(
  //     generateLiveCodesConfig(projectConfigs, selectedProjectName)
  //   );
  // }

  return (
    <div style={{ width: "50%" }}>
      <h1>{selectedProjectName}</h1>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <ProjectSelector
          projectNames={projectNames}
          selectedProjectName={selectedProjectName}
          setSelectedProjectName={setSelectedProjectName}
          setIsLiveCodesReady={setIsLiveCodesReady}
        />
        <ToggleAnswer
          showAnswer={showAnswer}
          setShowAnswer={setShowAnswer}
          setIsLiveCodesReady={setIsLiveCodesReady}
        />
      </div>

      {isLiveCodesReady && (
        <LiveCodes config={liveCodesConfig} view="split" height="600px" />
      )}
    </div>
  );
}

/**
 * props includes:
 * config, className, style, height
 *
 */
