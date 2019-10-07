import { Octokit as Core } from "@octokit/core";
import { createActionAuth } from "@octokit/auth-action";

import { VERSION } from "./version";

export const Octokit = Core.defaults({
  auth: createActionAuth(),
  userAgent: `octokit-action.js/${VERSION}`
});
