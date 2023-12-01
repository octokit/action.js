import { Octokit as Core } from "@octokit/core";
import { createActionAuth } from "@octokit/auth-action";
import { paginateRest } from "@octokit/plugin-paginate-rest";
import { legacyRestEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";
export type { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

import { VERSION } from "./version.js";
import type { OctokitOptions } from "@octokit/core/dist-types/types.js";
import { fetch as undiciFetch, ProxyAgent } from "undici";

const DEFAULTS = {
  authStrategy: createActionAuth,
  baseUrl: getApiBaseUrl(),
  userAgent: `octokit-action.js/${VERSION}`,
};

export function getProxyAgent() {
  const httpProxy = process.env["HTTP_PROXY"] || process.env["http_proxy"];
  if (httpProxy) {
    return new ProxyAgent(httpProxy);
  }

  const httpsProxy = process.env["HTTPS_PROXY"] || process.env["https_proxy"];
  if (httpsProxy) {
    return new ProxyAgent(httpsProxy);
  }

  return undefined;
}

export const customFetch = async function (url: string, opts: any) {
  return await undiciFetch(url, {
    dispatcher: getProxyAgent(),
    ...opts,
  });
};

export const Octokit = Core.plugin(
  paginateRest,
  legacyRestEndpointMethods,
).defaults(function buildDefaults(options: OctokitOptions): OctokitOptions {
  return {
    ...DEFAULTS,
    ...options,
    request: {
      fetch: customFetch,
      ...options.request,
    },
  };
});

export type Octokit = InstanceType<typeof Octokit>;

function getApiBaseUrl(): string {
  /* istanbul ignore next */
  return process.env["GITHUB_API_URL"] || "https://api.github.com";
}
