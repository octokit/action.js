import { Octokit } from "@octokit/core";
import { OctokitOptions } from "@octokit/core/dist-types/types";
import { HttpsProxyAgent } from "https-proxy-agent";

export function autoProxyAgent(octokit: Octokit, options: OctokitOptions) {
  const proxy = process.env["HTTPS_PROXY"] || process.env["https_proxy"];

  if (!proxy) return;

  const agent = new HttpsProxyAgent(proxy);

  octokit.hook.before("request", (options) => {
    options.request.agent = agent;
  });
}
