# action.js

> GitHub API client for GitHub Actions

[![@latest](https://img.shields.io/npm/v/@octokit/action.svg)](https://www.npmjs.com/package/@octokit/action)
[![Build Status](https://github.com/octokit/action.js/workflows/Test/badge.svg)](https://github.com/octokit/action.js/actions)

## Usage

<table>
<tbody valign=top align=left>
<tr><th>
Browsers
</th><td width=100%>

`@octokit/action` is not meant for browser usage.

</td></tr>
<tr><th>
Node
</th><td>

Install with `npm install @octokit/action`

```js
import { Octokit } from "@octokit/action";
```

</td></tr>
</tbody>
</table>

> [!IMPORTANT]
> As we use [conditional exports](https://nodejs.org/api/packages.html#conditional-exports), you will need to adapt your `tsconfig.json` by setting `"moduleResolution": "node16", "module": "node16"`.
>
> See the TypeScript docs on [package.json "exports"](https://www.typescriptlang.org/docs/handbook/modules/reference.html#packagejson-exports).<br>
> See this [helpful guide on transitioning to ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) from [@sindresorhus](https://github.com/sindresorhus)

You can pass `secret.GITHUB_TOKEN` or any of your own secrets to a Node.js script. For example

```yml
name: My Node Action
on:
  - pull_request
jobs:
  my-action:
    runs-on: ubuntu-latest
    steps:
      # Check out code using git
      - uses: actions/checkout@v4
      # Install Node 20
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install @octokit/action
      # Node.js script can be anywhere. A good convention is to put local GitHub Actions
      # into the `.github/actions` folder
      - run: node .github/actions/my-script.js
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Setting `GITHUB_TOKEN` on either [`with:`](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepswith) or [`env:`](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#env) will work.

```js
// .github/actions/my-script.js
import { Octokit } from "@octokit/action";

const octokit = new Octokit();

// `octokit` is now authenticated using GITHUB_TOKEN
```

### Create an issue using REST API

```js
import { Octokit } from "@octokit/action";

const octokit = new Octokit();
const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");

// See https://developer.github.com/v3/issues/#create-an-issue
const { data } = await octokit.request("POST /repos/{owner}/{repo}/issues", {
  owner,
  repo,
  title: "My test issue",
});
console.log("Issue created: %s", data.html_url);
```

You can also use `octokit.issues.create({ owner, repo, title })`. See the [REST endpoint methods plugin](https://github.com/octokit/plugin-rest-endpoint-methods.js/) for a list of all available methods.

### Create an issue using GraphQL

```js
import { Octokit } from "@octokit/action";

const octokit = new Octokit();
const eventPayload = require(process.env.GITHUB_EVENT_PATH);
const repositoryId = eventPayload.repository.node_id;

const response = await octokit.graphql(
  `
  mutation($repositoryId:ID!, $title:String!) {
    createIssue(input:{repositoryId: $repositoryId, title: $title}) {
      issue {
        number
      }
    }
  }
  `,
  {
    repositoryId,
    title: "My test issue",
  },
);
```

### Hooks, plugins, and more

`@octokit/action` is build upon `@octokit/core`. Refer to [its README](https://github.com/octokit/core.js#readme) for the full API documentation.

### TypeScript: Endpoint method parameters and responses

Types for endpoint method parameters and responses are exported as `RestEndpointMethodTypes`. They keys are the same as the endpoint methods. Here is an example to retrieve the parameter and response types for `octokit.checks.create()`

```ts
import { RestEndpointMethodTypes } from `@octokit/action`;

type ChecksCreateParams =
  RestEndpointMethodTypes["checks"]["create"]["parameters"];
type ChecksCreateResponse =
  RestEndpointMethodTypes["checks"]["create"]["response"];
```

### Proxy Servers

If you use [self-hosted runners](https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners) and require a proxy server to access internet resources then you will need to ensure that you have correctly configured the runner for [proxy servers](https://docs.github.com/en/actions/hosting-your-own-runners/using-a-proxy-server-with-self-hosted-runners). `@octokit/action` will pick up the configured proxy server environment variables and configure `@octokit/core` with the correct `request.dispatcher` using [ProxyAgent](https://undici.nodejs.org/#/docs/api/ProxyAgent). If you need to supply a different `request.dispatcher` then you should ensure that it handles proxy servers if needed.

## How it works

`@octokit/action` is simply a [`@octokit/core`](https://github.com/octokit/core.js#readme) constructor, pre-authenticate using [`@octokit/auth-action`](https://github.com/octokit/auth-action.js#readme).

The source code is … simple: [`src/index.ts`](src/index.ts).

## License

[MIT](LICENSE)
