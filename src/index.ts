import { Octokit as Core } from "@octokit/core";
import { createActionAuth } from "@octokit/auth-action";
import { paginateRest } from "@octokit/plugin-paginate-rest";

import { VERSION } from "./version";

export const Octokit = Core.plugin([paginateRest]).defaults({
  authStrategy: createActionAuth,
  userAgent: `octokit-action.js/${VERSION}`
});
