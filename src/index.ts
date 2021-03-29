import { Octokit as Core } from "@octokit/core";
import { createActionAuth } from "@octokit/auth-action";
import { paginateRest } from "@octokit/plugin-paginate-rest";
import { legacyRestEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";
export { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

import { VERSION } from "./version";

export const Octokit = Core.plugin(
  paginateRest,
  legacyRestEndpointMethods
).defaults({
  authStrategy: createActionAuth,
  baseUrl: getApiBaseUrl(),
  userAgent: `octokit-action.js/${VERSION}`,
});

function getApiBaseUrl(): string {
  /* istanbul ignore next */
  return process.env["GITHUB_API_URL"] || "https://api.github.com";
}
