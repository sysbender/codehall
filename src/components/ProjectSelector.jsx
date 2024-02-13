import React, { useState } from "react";

export default function ProjectSelector({
  projectNames,
  selectedProjectName,
  setSelectedProjectName,
  setIsLiveCodesReady,
}) {
  function projectChangeHandler(event) {
    const selectedValue = event.target.value;
    setIsLiveCodesReady(false);
    setSelectedProjectName(selectedValue);
  }
  return (
    <div>
      <label htmlFor="projectName" style={{ paddingRight: "8px" }}>
        Select Project
      </label>
      <select
        name="projectName"
        id="projectName"
        onChange={projectChangeHandler}
        value={selectedProjectName}
      >
        {projectNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}
