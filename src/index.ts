import { Octokit as Core } from "@octokit/core";
import { createActionAuth } from "@octokit/auth-action";
import { paginateRest } from "@octokit/plugin-paginate-rest";
import { legacyRestEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";
export { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

import { VERSION } from "./version";
import { OctokitOptions } from "@octokit/core/dist-types/types";
const HttpsProxyAgent = require("https-proxy-agent");

const DEFAULTS = {
  authStrategy: createActionAuth,
  baseUrl: getApiBaseUrl(),
  userAgent: `octokit-action.js/${VERSION}`,
};

function getProxyAgent() {
  const httpProxy = process.env["HTTP_PROXY"] || process.env["http_proxy"];
  if (httpProxy) {
    return new HttpsProxyAgent(httpProxy);
  }

  const httpsProxy = process.env["HTTPS_PROXY"] || process.env["https_proxy"];
  if (httpsProxy) {
    return new HttpsProxyAgent(httpsProxy);
  }

  return undefined;
}

export const Octokit = Core.plugin(
  paginateRest,
  legacyRestEndpointMethods
).defaults(function buildDefaults(options: OctokitOptions): OctokitOptions {
  return {
    ...DEFAULTS,
    ...options,
    request: {
      agent: getProxyAgent(),
      ...options.request,
    },
  };
});

export type Octokit = InstanceType<typeof Octokit>;

function getApiBaseUrl(): string {
  /* istanbul ignore next */
  return process.env["GITHUB_API_URL"] || "https://api.github.com";
}
