name: Test
"on":
  - push
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node_version:
          - 10
          - 12
          - 14
          - 16
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node_version }}
        uses: actions/setup-node@v2
        with:
          cache: npm
          node-version: ${{ matrix.node_version }}
      - name: Install
        run: npm ci
      - name: Test
        run: npm test
      - name: Test TypeScript
      - tests: Test'@ci
        run: npm run test:typescriptimport { Octokit } from "../src";

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
