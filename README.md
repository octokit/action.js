# action.js

> GitHub API client for GitHub Actions

[![@latest](https://img.shields.io/npm/v/@octokit/action.svg)](https://www.npmjs.com/package/@octokit/action)
[![Build Status](https://github.com/octokit/action.js/workflows/Test/badge.svg)](https://github.com/octokit/action.js/actions)
[![Greenkeeper](https://badges.greenkeeper.io/octokit/action.js.svg)](https://greenkeeper.io/)

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
const { Octokit } = require("@octokit/action");
// or: import { Octokit } from "@octokit/action";
```

</td></tr>
</tbody>
</table>

### Create an issue using REST API

```js
const octokit = new Octokit();
const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");

// See https://developer.github.com/v3/issues/#create-an-issue
const { data } = await octokit.request("POST /repos/:owner/:repo/issues", {
  owner,
  repo,
  title: "My test issue"
});
console.log("Issue created: %d", data.html_url);
```

You can also use `octokit.issues.create({ owner, repo, title })`. See the [REST endpoint methods plugin](https://github.com/octokit/plugin-rest-endpoint-methods.js/) for a list of all available methods.

### Create an issue using GraphQL

```js
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
    title: "My test issue"
  }
);
```

### Hooks, plugins, and more

`@octokit/action` is build upon `@octokit/core`. Refer to [its README](https://github.com/octokit/core.js#readme) for the full API documentation.

## How it works

`@octokit/action` is simply a [`@octokit/core`](https://github.com/octokit/core.js#readme) constructor, pre-authenticate using [`@octokit/auth-action](https://github.com/octokit/auth-action.js#readme).

The source code is … simple: [`src/index.ts`](src/index.ts).

## License

[MIT](LICENSE)
