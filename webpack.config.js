import { merge } from "webpack-merge";

import wpApp from "./webpack.app.js";
import wpCommon from "./webpack.common.js";

export default (env, argv) => {
  return merge(wpCommon, wpApp);
};
