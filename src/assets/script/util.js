// Assuming your JSON file is named filelist.json and has a structure like { "files": ["file1.txt", "file2.txt", ...] }

// codeProject for wrap and cache the functions
function createCodeProject() {
  let versions; // project version names
  let config; // project config
  const descriptions = {}; // version description
  const liveCodesConfigs = new Map(); //  liveCodes config for all the versions
  async function getVersions() {
    if (!config) {
      config = await fetchProjectConfig();
    }
    if (!versions) {
      versions = getProjectVersions(config);
    }

    return versions;
  }

  async function getUrl(version) {
    await getVersions();
    if (!version in versions) {
      throw new Error(`Project version not exist : ${version}`);
    }
    const versionObj = versions.find((v) => {
      v.name === version;
    });
    if (versionObj) {
      return versionObj.url;
    }
    return "#";
  }

  // get version config ( with url instead of content)

  function getVersionConfig(version) {
    const versionObj = config.find((v) => {
      return v.name === version;
    });
    if (versionObj) {
      return versionObj["config"];
    }
  }
  // {'name':'', url, description}
  async function getDescription(version) {
    await getVersions();
    if (!version in versions) {
      throw new Error(`Project version not exist : ${version}`);
    }
    // get description
    const desc = await loadTextFile(`./${version}/description.md`);
    return desc;
  }

  async function getLiveCodesConfig(version) {
    await getVersions();

    if (!liveCodesConfigs.has(version)) {
      const versionConfig = getVersionConfig(version);

      if (!versionConfig) {
        throw new Error(`No config found for version :${version}`);
      }
      const newConf = await fetchProjectFiles2(version, versionConfig);
      liveCodesConfigs.set(version, newConf);
    }
    return liveCodesConfigs.get(version);
  }

  return {
    getVersions,
    getUrl,
    getDescription,
    getLiveCodesConfig,
  };
}

//
async function fetchProjectFiles2(version, projectConfig) {
  const newProjectConfig = structuredClone(projectConfig);
  // load files for project

  for (let item in newProjectConfig) {
    const fileName = newProjectConfig[item].content;
    const filePath = `${version}/${fileName}`;

    const fileContent = await loadTextFile(filePath);
    if (fileContent) {
      newProjectConfig[item].content = fileContent;
    }
  }

  return newProjectConfig;
}

async function loadJsonFile(filePath = "project.json") {
  try {
    const res = await fetch(filePath);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);
    return "";
  }
}

async function loadTextFile(filePath) {
  try {
    const res = await fetch(filePath);
    const data = await res.text();
    return data;
  } catch (err) {
    console.error(err.message);
    return "";
  }
}

function getSearchParameter(name = "version") {
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get(name);
  return param;
}

function setSearchParameter(name = "version", value = "starter") {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set(name, value);

  const newUrl = `${window.location.origin}${
    window.location.pathname
  }?${urlParams.toString()}`;
  window.history.replaceState({}, "", newUrl);
}

/**
 * creates a dynamic dropdown (<select>) based on the provided options array
 * and sets up an event listener to execute a callback (changeHandle)
 * when the user changes the selection.
 * @param {*} selectElementId - select element id
 * @param {*} options - array for options ['proj-starter', 'proj-finished']
 * @param {*} changeHandle - load a new config for livecodes playground
 */
function createConfigOptions(selectElementId, options, changeHandle) {
  if (!options) {
    options = ["starter", "finished"];
  }

  if (!changeHandle) {
    changeHandle = () => {
      console.log(" please add event handle for selecting config");
    };
  }
  const selectElement = document.getElementById(selectElementId);

  options.forEach((option, index) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.text = option;
    selectElement.appendChild(optionElement);
  });

  selectElement.addEventListener("change", function () {
    const option = this.value;
    changeHandle(option);
  });
}

// --------------------get project config from config.json

async function fetchProjectConfig() {
  const pathname = window.location.pathname;
  const dirname = "".split("/")[-2];

  const data = await loadJsonFile("config.json");

  return data;
}

function getProjectVersions(projConf) {
  return projConf.map((version) => {
    return version.name;
  });
}
export {
  getSearchParameter,
  setSearchParameter,
  createConfigOptions,
  createCodeProject,
};
