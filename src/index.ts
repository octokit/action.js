import { Octokit as Core } from "@octokit/core";
import { createActionAuth } from "@octokit/auth-action";
import { paginateRest } from "@octokit/plugin-paginate-rest";
import { restEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";
export { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

import { VERSION } from "./version";

export const Octokit = Core.plugin(paginateRest, restEndpointMethods).defaults({
  authStrategy: createActionAuth,
  baseUrl: getApiBaseUrl(),
  userAgent: `octokit-action.js/${VERSION}`,
});

function getApiBaseUrl(): string {
  return process.env["GITHUB_API_URL"] || "https://api.github.com";
}
