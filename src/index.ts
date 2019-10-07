import { Octokit as Core } from "@octokit/core";
import { createActionAuth } from "@octokit/auth-action";

export const Octokit = Core.defaults({
  auth: createActionAuth()
});
