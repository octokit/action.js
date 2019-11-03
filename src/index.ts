import { Octokit as Core } from "@octokit/core";
import { createActionAuth } from "@octokit/auth-action";

import { VERSION } from "./version";

export const Octokit = Core.defaults({
  authStrategy: createActionAuth,
  userAgent: `octokit-action.js/${VERSION}`
});
