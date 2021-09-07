import { Octokit as Core } from "@octokit/core";
import { createActionAuth } from "@octokit/auth-action";
import { paginateRest } from "@octokit/plugin-paginate-rest";
import { legacyRestEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";
export { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

import { VERSION } from "./version";
import { OctokitOptions } from "@octokit/core/dist-types/types";
import ProxyAgent from "proxy-agent";

const DEFAULTS = {
  authStrategy: createActionAuth,
  baseUrl: getApiBaseUrl(),
  userAgent: `octokit-action.js/${VERSION}`,
};

export const Octokit = Core.plugin(
  paginateRest,
  legacyRestEndpointMethods
).defaults(function buildDefaults(options: OctokitOptions): OctokitOptions {
  return {
    ...DEFAULTS,
    ...options,
    request: {
      agent: new ProxyAgent(),
      ...options.request,
    },
  };
});

export type Octokit = InstanceType<typeof Octokit>;

function getApiBaseUrl(): string {
  /* istanbul ignore next */
  return process.env["GITHUB_API_URL"] || "https://api.github.com";
}
