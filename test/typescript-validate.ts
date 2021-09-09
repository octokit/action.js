import { Octokit } from "../src";

// ************************************************************
// THIS CODE IS NOT EXECUTED. IT IS JUST FOR TYPECHECKING
// ************************************************************

export async function test(octokit: Octokit) {
  // check responses
  const repoResponse = await octokit.rest.repos.get({
    owner: "octokit",
    repo: "rest.js",
  });
  repoResponse.data;
  repoResponse.status;
  repoResponse.headers.link;
  repoResponse.headers.etag;
  repoResponse.headers.status;
}
