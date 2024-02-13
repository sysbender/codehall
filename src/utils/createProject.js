//import { util } from "webpack";
import {
  getSearchParameter,
  setSearchParameter,
  createConfigOptions,
  fetchProjectConfig,
  getProjectVersions,
  loadJsonFile,
  loadTextFile,
  fetchProjectFiles,
  mdToHtml,
} from "./projectUtils.js";
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

  // get url for final or complete page
  async function getUrl(version) {
    await getVersions();
    if (!version in versions) {
      throw new Error(`Project version not exist : ${version}`);
    }
    const versionObj = config.find((v) => {
      return v.name === version;
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
    return mdToHtml(desc);
  }

  async function getLiveCodesConfig(version) {
    await getVersions();

    if (!liveCodesConfigs.has(version)) {
      const versionConfig = getVersionConfig(version);

      if (!versionConfig) {
        throw new Error(`No config found for version :${version}`);
      }
      const newConf = await fetchProjectFiles(version, versionConfig);
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

export { createCodeProject };
