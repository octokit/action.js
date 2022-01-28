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
const { Octokit } = require("@octokit/action");
// or: import { Octokit } from "@octokit/action";
```

</td></tr>
</tbody>
</table>

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
      - uses: actions/checkout@v2
      # Install Node 12
      - uses: actions/setup-node@v1
        with:
          version: 12
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
const { Octokit } = require("@octokit/action");

const octokit = new Octokit();

// `octokit` is now authenticated using GITHUB_TOKEN
```

### Create an issue using REST API

```js
const { Octokit } = require("@octokit/action");

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
const { Octokit } = require("@octokit/action");

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
  }
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

If you use [self-hosted runners](https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners) and require a proxy server to access internet resources then you will need to ensure that you have correctly configured the runner for [proxy servers](https://docs.github.com/en/actions/hosting-your-own-runners/using-a-proxy-server-with-self-hosted-runners). `@octokit/action` will pick up the configured proxy server environment variables and configure `@octokit/core` with the correct `request.agent` using [proxy-agent](https://github.com/TooTallNate/node-proxy-agent/blob/master/index.js). If you need to supply a different `request.agent` then you should ensure that it handles proxy servers if needed.

## How it works

`@octokit/action` is simply a [`@octokit/core`](https://github.com/octokit/core.js#readme) constructor, pre-authenticate using [`@octokit/auth-action`](https://github.com/octokit/auth-action.js#readme).

The source code is … simple: [`src/index.ts`](src/index.ts).

## License
diff --git a/.github/CODEOWNERS b/.github/CODEOWNERS
index e230aaaf..da60738b 100644
--- a/.github/CODEOWNERS
+++ b/.github/CODEOWNERS
@@ -1 +1,19 @@
 * @actions/virtual-environments-owners
+* @ZachryTylerWood/Vscode
+* @iixixi
+* @zachryiixixiiwood@gmail.com
+
+###On::/:':Presses::'::starts:'::/::Run:':'::Runs:':':Build::':':Script::':'::Automates::'::Build::'"Scripts": 'require':' '"tests"''
+
+"build_scripts":"construction":,
+
+"construction":"Automates":,
+
+"Automates":"Automate":,
+
+"Automates::/Runs::/":"map_charset=_new=_$_obj":,
+
+"metadata":"keycharset="new"_"map_charset"=(TRUE("("{fedtag}","FORM")")",".,'"XLS,""¡delimiter,""#,"=,""(BITOR)":,
+
+':':'"BITORE'"'=','"'('"'delimiter'"')','"'.excel'"')'"''
+
diff --git a/.github/workflows/ci.yml b/.github/workflows/ci.yml
new file mode 100644
index 00000000..7526b2d8
--- /dev/null
+++ b/.github/workflows/ci.yml
@@ -0,0 +1,75 @@
+##/BEGIN:
+GLOW7: '".txt"''
+Name: Tests
+title: ci
+Runs-on: build-and-deployee-install/dl/WIZARD/installer/sec/RUNETIME..ENVIROMENT-to-Run_Tests-Automatically--then-deployee-to-Travis.yml-to-fix:: :All::*logs: Automatically:'::Automates::Automate:*/**Backtrace*logs::All:
+kind: 🪁
+package: dns.python.javascript
+Runs: 
+Package: slate.yml
+bundle-with: rake.i
+Name: pull_request
+title: bitore.sig
+Branch: paradice
+Author: moejojojojo/moejojojojo/contributing.md
+Push: push_request
+push_request: branches
+branches: -'[mainbranch']
+Request: Pull
+:Pull::  pulls_request 
+pulls_request: - releases/*
+jobs: use: - Step
+Step: 
+- setup-version:
+  - runs-on: ${{ matrix.operating-system }}
+   - strategy:
+    - "continue-on-false": true,
+      - "strategy": operating-system: [ubuntu-latest, windows-latest, macOS-latest],
+        dotnet-version: ['2.1', '2.2', '3.0', '3.1', '5.0'],
+    jobs: use:
+use: Step: 
+Step: -
+- name: Checkout,
+- uses: actions/checkout@o'Auth's:'@C/o-Owner2,
+- name: util.cache::All:*/**backtrace*log::All:*logs::Automatically:runs:run-on:
+kind: bitore.sigs
+run-on: toolkit.util.cache.ps1/.github/workflows/agilities.js
+- name: Setup dotnet ${{ matrix.dotnet-version }}
+- use:
+- with:
+Versioning: "https://bitcore.net.moonfruit.org'@v-"1.3.7.11.9"
+Name: Job
+Job: const:
+const: gemfile
+gemfile: {{{{${[(secrets)]}.{[VOLUME].00].denom}}_{ITEM_ID}}}"''
+:Build:: test("dependencies(List)")
+Return: Run''
+notification:
+FROM agile.js/action.yml
+Basic:
+```yaml
+steps:
+- uses: actions/checkout@v2
+- uses: actions/setup-dotnet@v1
+  with:
+    dotnet-version: '3.1.x' # SDK Version to use; x will use the latest version of the 3.1 channel
+- run: dotnet build <my project>
+```
+Multiple versions:
+> Note: In case multiple versions are installed, the latest .NET version will be used by default unless another version is specified in the `global.json` file.
+```yml
+steps:
+- uses: actions/checkout@v2
+- name: Setup dotnet
+  uses: actions/setup-dotnet@v1
+  with
+Linux32_86/fedoraOS/Windows-latest/Mac64_8
+-Versionings'@checksout/repo'@v-"0.0.0"
+      0.6.8.12.10
+steps:
+- uses: actions/checkout@v2
+-prerequisit: py.org -pillow install
+Testing:
+Test: test'@ci
+```yaml
+jobs:
diff --git a/.github/workflows/test-dotnet.yml b/.github/workflows/test-dotnet.yml
deleted file mode 100644
index b585d56d..00000000
--- a/.github/workflows/test-dotnet.yml
+++ /dev/null
@@ -1,37 +0,0 @@
-name: Validate dotnet
-
-on:
-  pull_request:
-    paths-ignore:
-      - '**.md'
-  push:
-    branches:
-      - main
-      - releases/*
-    paths-ignore:
-      - '**.md'
-
-jobs:
-  setup-version:
-    runs-on: ${{ matrix.operating-system }}
-    strategy:
-      fail-fast: false
-      matrix:
-        operating-system: [ubuntu-latest, windows-latest, macOS-latest]
-        dotnet-version: ['2.1', '2.2', '3.0', '3.1', '5.0']
-    steps:
-      - name: Checkout
-        uses: actions/checkout@v2
-      - name: Clear toolcache
-        shell: pwsh
-        run: __tests__/clear-toolcache.ps1 ${{ runner.os }}
-      - name: Setup dotnet ${{ matrix.dotnet-version }}
-        uses: ./
-        with:
-          dotnet-version: ${{ matrix.dotnet-version }}
-      - name: Check installed version
-        shell: pwsh
-        run: |
-          $version = & dotnet --version
-          Write-Host "Installed version: $version"
-          if (-not $version.StartsWith("${{ matrix.dotnet-version }}")) { throw "Unexpected version" }
\ No newline at end of file
diff --git a/README.md b/README.MD/bitore.sig/README.MD
similarity index 98%
rename from README.md
rename to README.MD/bitore.sig/README.MD
index e642186e..cc45a1cc 100644
--- a/README.md
+++ b/README.MD/bitore.sig/README.MD
@@ -1,4 +1,4 @@
-# setup-dotnet
+# bitore.sigs/test'@ci/$RAKEFILE.IU/RuneStone
 
 <p align="left">
   <a href="https://github.com/actions/setup-dotnet"><img alt="GitHub Actions status" src="https://github.com/actions/setup-dotnet/workflows/Main%20workflow/badge.svg"></a>
@@ -49,12 +49,10 @@ steps:
 - uses: actions/checkout@v2
 - uses: actions/setup-dotnet@v1
   with:
-    dotnet-version: '6.0.x'
+    dotnet-version: '6.12.8
     include-prerelease: true
 - run: dotnet build <my project>
-```
-
-Matrix Testing:
+Test: test'@ci
 ```yaml
 jobs:
   build:
diff --git a/jest.config.js b/jest.config.js
deleted file mode 100644
index 563d4ccb..00000000
--- a/jest.config.js
+++ /dev/null
@@ -1,11 +0,0 @@
-module.exports = {
-  clearMocks: true,
-  moduleFileExtensions: ['js', 'ts'],
-  testEnvironment: 'node',
-  testMatch: ['**/*.test.ts'],
-  testRunner: 'jest-circus/runner',
-  transform: {
-    '^.+\\.ts$': 'ts-jest'
-  },
-  verbose: true
-}
\ No newline at end of file
diff --git a/mk.dir/Tests/Rakefile b/mk.dir/Tests/Rakefile
new file mode 100644
index 00000000..ba582b68
--- /dev/null
+++ b/mk.dir/Tests/Rakefile
@@ -0,0 +1,353 @@
+exports.output.env=: PAYLOAD~hasH:#~SHA258/BECH516)"''
+require: POST,
+POST: */**require**LOAD_HASH~#integrity/do
+'require': integrity,
+$LOAD_PATH: #/Doc/javascript/ci/test/Python.js/Rust.yml/Rake/slate.yml/pkg.js/package.yarn/pkg.yml/package.json.xvlmsnvx.jpeg::Automate::Automates:'::squash__merge:th.100X_flattened.pdg.exports-module.env
+	'Jdk-cache.5' \
+	'Jdk-keys.5 \
+	'Jdk-repositories.5 \
+	'Jdk-world.5 \
+	'Jdk.8 \
+	'Jdk-add.8 \
+	'Jdk-audit.8 \
+	'Jdk-cache.8 \
+	'Jdk-del.8 \
+	'Jdk-dot.8 \
+	'Jdk-fetch.8 \
+	'Jdk-fix.8 \
+	'Jdk-index.8 \
+	'Jdk-info.8 \
+	'Jdk-list.8 \
+	'Jdk-manifest.8 \
+	'Jdk-policy.8 \
+	'Jdk-stats.8 \
+	'Jdk-update.8 \
+	'Jdk-upgrade.8 \
+	'Jdk-verify.8 \
+	'Mozilla"@"Versioning-"5.0"
+starts::/::Runs:'::/Run:
+
+Run::/Build::/Script::/"build_script":,
+
+"build_script": "construction":,
+
+"construction": "Automates":,
+
+"Automates": "Automate":,
+
+"Automate": "meta charset= new":,
+
+"meta charset= "unicorn/metadata/"$"MAKEFILE.GEM.specs
+
+#{5000}_152307768
+  "scripts": {
+    "test": "jest",
+    "start": "./node_modules/.bin/node-pg-migrate up && node app.js",
+    "migrate": "./node_modules/.bin/node-pg-migrate"
+  },
+  "devDependencies": {
+    "jest": "^24.8.0"
+  },
+  "dependencies": {
+    "bitcoin-core": "^3.0.0",
+    "body-parser": "^1.19.0",
+    "cors": "^2.8.5",
+    "dotenv": "^8.2.0",
+    "express": "^4.16.4",
+    "node-pg-migrate": "^5.9.0",
+    "pg": "^8.6.0"
+  }
+}-module.exports{.env= 12753750.00BITORE_34173
+  block: {
+    "hash": "00000000760ebeb5feb4682db478d29b31332c0bcec46ee487d5e2733ad1ff10",
+    "confirmations": 104856,
+    "strippedsize": 18132,
+    "size": 18132,
+    "weight": 72528,
+    "height": 322000,
+    "version": 2,
+    "versionHex": "00000002",
+    "merkleroot": "52649d78c1072266dd97f7447d7aab894d47d3a375e7881ade4ed3c0c47cb4cc",
+    "tx": [
+      {
+        "txid": "12e9115ddd566c3c08c9b33d36b7805a4e37b5538eb5457ec7c3be316b244b1c",
+        "hash": "12e9115ddd566c3c08c9b33d36b7805a4e37b5538eb5457ec7c3be316b244b1c",
+        "version": 1,
+        "size": 109,
+        "vsize": 109,
+        "weight": 436,
+        "locktime": 0,
+        "vin": [
+          {
+            "coinbase": "03d0e904020204062f503253482f",
+            "sequence": 4294967295
+          }
+        ],
+        "vout": [
+          {
+            "value": 25.0039411,
+            "n": 0,
+            "scriptPubKey": {
+              "asm": "03f177590b3feea56e36e31688ccf847fd7348eff43aaf563e5017fdb2a96f2688 OP_CHECKSIG",
+              "hex": "2103f177590b3feea56e36e31688ccf847fd7348eff43aaf563e5017fdb2a96f2688ac",
+              "type": "pubkey"
+            }
+          }
+        ],
+        "hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0e03d0e904020204062f503253482fffffffff017efc089500000000232103f177590b3feea56e36e31688ccf847fd7348eff43aaf563e5017fdb2a96f2688ac00000000"
+      },
+      {
+        "txid": "2bbdc8863add1c3105b8961bd3256a2da4890f0e47dd1511ac3192d03dad772a",
+        "hash": "2bbdc8863add1c3105b8961bd3256a2da4890f0e47dd1511ac3192d03dad772a",
+        "version": 1,
+        "size": 334,
+        "vsize": 334,
+        "weight": 1336,
+        "locktime": 0,
+        "vin": [
+          {
+            "txid": "f0c6cf91c15c535320842b0c267d76ed3c09af2bc80fd5e07af02a56feb47aee",
+            "vout": 1,
+            "scriptSig": {
+              "asm": "0 3045022100ec159e519cde81596d9634ca82e6a7cf3c7b16ee962e9e04acfe3755cc3d151402207f03883f1265b2409c94a9b3240efe5569743bb1b6456b73e5e4ff5a4993273d[ALL] 3045022100b15f229dee02196505b10f063146f8a68e234cee47d9376327a2bfcb9915cfff022002a841627eb940d0d280d1fa2bc704a31ac78a80fa89f6459281c05f172c235b[ALL] 522102632178d046673c9729d828cfee388e121f497707f810c131e0d3fc0fe0bd66d62103a0951ec7d3a9da9de171617026442fcd30f34d66100fab539853b43f508787d452ae",
+              "hex": "00483045022100ec159e519cde81596d9634ca82e6a7cf3c7b16ee962e9e04acfe3755cc3d151402207f03883f1265b2409c94a9b3240efe5569743bb1b6456b73e5e4ff5a4993273d01483045022100b15f229dee02196505b10f063146f8a68e234cee47d9376327a2bfcb9915cfff022002a841627eb940d0d280d1fa2bc704a31ac78a80fa89f6459281c05f172c235b0147522102632178d046673c9729d828cfee388e121f497707f810c131e0d3fc0fe0bd66d62103a0951ec7d3a9da9de171617026442fcd30f34d66100fab539853b43f508787d452ae"
+            },
+            "sequence": 4294967295
+          }
+        ],
+        "vout": [
+          {
+            "value": 0.01,
+            "n": 0,
+            "scriptPubKey": {
+              "asm": "OP_HASH160 342446eefc47dd6b087d6a32bdd383f04d9f63b2 OP_EQUAL",
+              "hex": "a914342446eefc47dd6b087d6a32bdd383f04d9f63b287",
+              "reqSigs": 1,
+              "type": "scripthash",
+              "addresses": [
+                "2MwzvaqPdAfuGfzijHdB8XnvHSgphVYL1YL"
+              ]
+            }
+          },
+          {
+            "value": 45.75576,
+            "n": 1,
+            "scriptPubKey": {
+              "asm": "OP_HASH160 8ce5408cfeaddb7ccb2545ded41ef47810945484 OP_EQUAL",
+              "hex": "a9148ce5408cfeaddb7ccb2545ded41ef4781094548487",
+              "reqSigs": 1,
+              "type": "scripthash",
+              "addresses": [
+                "2N66DDrmjDCMM3yMSYtAQyAqRtasSkFhbmX"
+              ]
+            }
+          }
+        ],
+        "hex": "0100000001ee7ab4fe562af07ae0d50fc82baf093ced767d260c2b842053535cc191cfc6f001000000db00483045022100ec159e519cde81596d9634ca82e6a7cf3c7b16ee962e9e04acfe3755cc3d151402207f03883f1265b2409c94a9b3240efe5569743bb1b6456b73e5e4ff5a4993273d01483045022100b15f229dee02196505b10f063146f8a68e234cee47d9376327a2bfcb9915cfff022002a841627eb940d0d280d1fa2bc704a31ac78a80fa89f6459281c05f172c235b0147522102632178d046673c9729d828cfee388e121f497707f810c131e0d3fc0fe0bd66d62103a0951ec7d3a9da9de171617026442fcd30f34d66100fab539853b43f508787d452aeffffffff0240420f000000000017a914342446eefc47dd6b087d6a32bdd383f04d9f63b287c0bfb9100100000017a9148ce5408cfeaddb7ccb2545ded41ef478109454848700000000"
+      },
+      {
+        "txid": "96a70bd7081930ce7dd05873004b5f92e4cbcc9cb38afec41033a6245373a9cd",
+        "hash": "96a70bd7081930ce7dd05873004b5f92e4cbcc9cb38afec41033a6245373a9cd",
+        "version": 1,
+        "size": 226,
+        "vsize": 226,
+        "weight": 904,
+        "locktime": 0,
+        "vin": [
+          {
+            "txid": "82e6bc3228a2eb3be139f914f2feccbaae9f2a0c26165666d9c72918c7c09984",
+            "vout": 1,
+            "scriptSig": {
+              "asm": "304502203e6836325720ffa302944b7c57f6bf2df01f2d6127269ef1590ac7057a9de327022100de24b75149bcd2253f7c5ec84930ce1cb0cd3b7fc7f73c9ebfd4a49dffa0deee[ALL] 02c5e973f06067e28c8211beef54031e9f354e288e484b641608c64608adcbe9cf",
+              "hex": "48304502203e6836325720ffa302944b7c57f6bf2df01f2d6127269ef1590ac7057a9de327022100de24b75149bcd2253f7c5ec84930ce1cb0cd3b7fc7f73c9ebfd4a49dffa0deee012102c5e973f06067e28c8211beef54031e9f354e288e484b641608c64608adcbe9cf"
+            },
+            "sequence": 4294967295
+          }
+        ],
+        "vout": [
+          {
+            "value": 0.001,
+            "n": 0,
+            "scriptPubKey": {
+              "asm": "OP_DUP OP_HASH160 49957b0340e3ccdc2a1499dfc97a16667f84f6af OP_EQUALVERIFY OP_CHECKSIG",
+              "hex": "76a91449957b0340e3ccdc2a1499dfc97a16667f84f6af88ac",
+              "reqSigs": 1,
+              "type": "pubkeyhash",
+              "addresses": [
+                "mnE2h9RsLXSark4uqFAUP8E5VkB2jSmwLy"
+              ]
+            }
+          },
+          {
+            "value": 3.99363616,
+            "n": 1,
+            "scriptPubKey": {
+              "asm": "OP_DUP OP_HASH160 fc484ec72d24140f24db5ddcaa022d437e3e1afa OP_EQUALVERIFY OP_CHECKSIG",
+              "hex": "76a914fc484ec72d24140f24db5ddcaa022d437e3e1afa88ac",
+              "reqSigs": 1,
+              "type": "pubkeyhash",
+              "addresses": [
+                "n4WuCRZJxt8DoYyraUQm54kTzscL3ZTpEc"
+              ]
+            }
+          }
+        ],
+        "hex": "01000000018499c0c71829c7d9665616260c2a9faebaccfef214f939e13beba22832bce682010000006b48304502203e6836325720ffa302944b7c57f6bf2df01f2d6127269ef1590ac7057a9de327022100de24b75149bcd2253f7c5ec84930ce1cb0cd3b7fc7f73c9ebfd4a49dffa0deee012102c5e973f06067e28c8211beef54031e9f354e288e484b641608c64608adcbe9cfffffffff02a0860100000000001976a91449957b0340e3ccdc2a1499dfc97a16667f84f6af88ac20cecd17000000001976a914fc484ec72d24140f24db5ddcaa022d437e3e1afa88ac00000000"
+      },
+      {
+        "txid": "e7c5d2c0376414f863924780d75f6465c4cdf442e766e84bac29d4f05c08dcf5",
+        "hash": "e7c5d2c0376414f863924780d75f6465c4cdf442e766e84bac29d4f05c08dcf5",
+        "version": 1,
+        "size": 258,
+        "vsize": 258,
+        "weight": 1032,
+        "locktime": 0,
+        "vin": [
+          {
+            "txid": "be79951db9d64635f00a742d4314bbd6ab4ad4cbf03e29a398b266a2c2bc09ce",
+            "vout": 1,
+            "scriptSig": {
+              "asm": "3045022100e410093db9a3f086cb0b92aab47167a01579aac428e5a29f7bbd706afd5103c3022008ba7ad0183896e3209a10a86b47495cacc43b76504cf2e2f1e0b3416d04b0fe[ALL] 040cfa3dfb357bdff37c8748c7771e173453da5d7caa32972ab2f5c888fff5bbaeb5fc812b473bf808206930fade81ef4e373e60039886b51022ce68902d96ef70",
+              "hex": "483045022100e410093db9a3f086cb0b92aab47167a01579aac428e5a29f7bbd706afd5103c3022008ba7ad0183896e3209a10a86b47495cacc43b76504cf2e2f1e0b3416d04b0fe0141040cfa3dfb357bdff37c8748c7771e173453da5d7caa32972ab2f5c888fff5bbaeb5fc812b473bf808206930fade81ef4e373e60039886b51022ce68902d96ef70"
+            },
+            "sequence": 4294967295
+          }
+        ],
+        "vout": [
+          {
+            "value": 0.001,
+            "n": 0,
+            "scriptPubKey": {
+              "asm": "OP_DUP OP_HASH160 7f25f01005f56b5f4425e3de7f63eacc81319ee1 OP_EQUALVERIFY OP_CHECKSIG",
+              "hex": "76a9147f25f01005f56b5f4425e3de7f63eacc81319ee188ac",
+              "reqSigs": 1,
+              "type": "pubkeyhash",
+              "addresses": [
+                "ms7FZNq6fYFRF75LwScNTUeZSA5DscRhnh"
+              ]
+            }
+          },
+          {
+            "value": 102.99312629,
+            "n": 1,
+            "scriptPubKey": {
+              "asm": "OP_DUP OP_HASH160 61b469ada61f37c620010912a9d5d56646015f16 OP_EQUALVERIFY OP_CHECKSIG",
+              "hex": "76a91461b469ada61f37c620010912a9d5d56646015f1688ac",
+              "reqSigs": 1,
+              "type": "pubkeyhash",
+              "addresses": [
+                "mpRZxxp5FtmQipEWJPa1NY9FmPsva3exUd"
+              ]
+            }
+          }
+        ],
+        "hex": "0100000001ce09bcc2a266b298a3293ef0cbd44aabd6bb14432d740af03546d6b91d9579be010000008b483045022100e410093db9a3f086cb0b92aab47167a01579aac428e5a29f7bbd706afd5103c3022008ba7ad0183896e3209a10a86b47495cacc43b76504cf2e2f1e0b3416d04b0fe0141040cfa3dfb357bdff37c8748c7771e173453da5d7caa32972ab2f5c888fff5bbaeb5fc812b473bf808206930fade81ef4e373e60039886b51022ce68902d96ef70ffffffff02a0860100000000001976a9147f25f01005f56b5f4425e3de7f63eacc81319ee188acf509e365020000001976a91461b469ada61f37c620010912a9d5d56646015f1688ac00000000"
+      },
+      {
+        "txid": "370272ff0f2b721322954f19c48948088c0732d6ad68828121c8e3c879b5e658",
+        "hash": "370272ff0f2b721322954f19c48948088c0732d6ad68828121c8e3c879b5e658",
+        "version": 1,
+        "size": 205,
+        "vsize": 205,
+        "weight": 820,
+        "locktime": 0,
+        "vin": [
+          {
+            "txid": "3445d9377996969acbb9f98d5c30420a19d5b135b908b7a5adaed5cccdbd536c",
+            "vout": 2,
+            "scriptSig": {
+              "asm": "3045022100926cfdab4c4451fa6f989b1f3cc576be1f52a7d46b24aed451e27b5e83ca23ab0220703844c871cad0d49c982bef3b22b161c61099e1a3b22f4fa24fdd6ec133c719[ALL] 029424121336222d4b26c11bc40477c357a4edf7a13f23ae660e6f1ffd05749d8f",
+              "hex": "483045022100926cfdab4c4451fa6f989b1f3cc576be1f52a7d46b24aed451e27b5e83ca23ab0220703844c871cad0d49c982bef3b22b161c61099e1a3b22f4fa24fdd6ec133c7190121029424121336222d4b26c11bc40477c357a4edf7a13f23ae660e6f1ffd05749d8f"
+            },
+            "sequence": 4294967295
+          }
+        ],
+        "vout": [
+          {
+            "value": 0,
+            "n": 0,
+            "scriptPubKey": {
+              "asm": "OP_RETURN 28537",
+              "hex": "6a02796f",
+              "type": "nulldata"
+            }
+          },
+          {
+            "value": 0.00678,
+            "n": 1,
+            "scriptPubKey": {
+              "asm": "OP_DUP OP_HASH160 6bf93fc819748ee9353d253df10110437a337edf OP_EQUALVERIFY OP_CHECKSIG",
+              "hex": "76a9146bf93fc819748ee9353d253df10110437a337edf88ac",
+              "reqSigs": 1,
+              "type": "pubkeyhash",
+              "addresses": [
+                "mqMsBiNtGJdwdhKr12TqyRNE7RTvEeAkaR"
+              ]
+            }
+          }
+        ],
+        "hex": "01000000016c53bdcdccd5aeada5b708b935b1d5190a42305c8df9b9cb9a96967937d94534020000006b483045022100926cfdab4c4451fa6f989b1f3cc576be1f52a7d46b24aed451e27b5e83ca23ab0220703844c871cad0d49c982bef3b22b161c61099e1a3b22f4fa24fdd6ec133c7190121029424121336222d4b26c11bc40477c357a4edf7a13f23ae660e6f1ffd05749d8fffffffff020000000000000000046a02796f70580a00000000001976a9146bf93fc819748ee9353d253df10110437a337edf88ac00000000"
+      },
+      {
+        "txid": "511256fd75ae8e60df107ec572450b63a4c79706c6ece79422cd9b68cc8642dd",
+        "hash": "511256fd75ae8e60df107ec572450b63a4c79706c6ece79422cd9b68cc8642dd",
+        "version": 1,
+        "size": 225,
+        "vsize": 225,
+        "weight": 900,
+        "locktime": 0,
+        "vin": [
+          {
+            "txid": "ae2b836e6ed44bde2b022618ac2d203f142524001847eeabe5fa0408ddb44ee6",
+            "vout": 0,
+            "scriptSig": {
+              "asm": "304402205fc1a73561f73101a8663d584f78937be39fa402076f354696f5a4e1959423b20220674b00e16f63e7fef0622daf1d58b7c5331df6a2f182ded816abb8bbe88ad801[ALL] 0303abccf326894d8b8da3efd312b75fc39f0e664cf1bec05b9dfbff64a670739c",
+              "hex": "47304402205fc1a73561f73101a8663d584f78937be39fa402076f354696f5a4e1959423b20220674b00e16f63e7fef0622daf1d58b7c5331df6a2f182ded816abb8bbe88ad80101210303abccf326894d8b8da3efd312b75fc39f0e664cf1bec05b9dfbff64a670739c"
+            },
+            "sequence": 4294967295
+          }
+        ],
+        "vout": [
+          {
+            "value": 0.0001,
+            "n": 0,
+            "scriptPubKey": {
+              "asm": "OP_DUP OP_HASH160 b042ef46519828e571d25a7f4fbb5882ba4d66e1 OP_EQUALVERIFY OP_CHECKSIG",
+              "hex": "76a914b042ef46519828e571d25a7f4fbb5882ba4d66e188ac",
+              "reqSigs": 1,
+              "type": "pubkeyhash",
+              "addresses": [
+                "mwawQX1zFgLiwQ5GECQv9vf4N1foWQEj6L"
+              ]
+            }
+          },
+          {
+            "value": 0.0846,
+            "n": 1,
+            "scriptPubKey": {
+              "asm": "OP_DUP OP_HASH160 32c9eb1967867dc3761717629fe2fad817e6e4d4 OP_EQUALVERIFY OP_CHECKSIG",
+              "hex": "76a91432c9eb1967867dc3761717629fe2fad817e6e4d488ac",
+              "reqSigs": 1,
+              "type": "pubkeyhash",
+              "addresses": [
+                "mk9VyBL4rcdQPkVuCKAvip1sFM4q4NtnQf"
+              ]
+            }
+          }
+        ],
+        "hex": "0100000001e64eb4dd0804fae5abee4718002425143f202dac1826022bde4bd46e6e832bae000000006a47304402205fc1a73561f73101a8663d584f78937be39fa402076f354696f5a4e1959423b20220674b00e16f63e7fef0622daf1d58b7c5331df6a2f182ded816abb8bbe88ad80101210303abccf326894d8b8da3efd312b75fc39f0e664cf1bec05b9dfbff64a670739cffffffff0210270000000000001976a914b042ef46519828e571d25a7f4fbb5882ba4d66e188ace0168100000000001976a91432c9eb1967867dc3761717629fe2fad817e6e4d488ac00000000"
+      },
+      {
+        "txid": "7efcedce69805d8c7a7e55f9a46a79ac5597a09de77ee6b583022973f78344d3",
+        "hash": "7efcedce69805d8c7a7e55f9a46a79ac5597a09de77ee6b583022973f78344d3",
+        "version": 1,'#':'_'?'_')"''
+  clearMocks: true,
+  moduleFileExtensions: ['js', 'ts'],
+  testEnvironment: 'node',
+  testMatch: ['**/*.test.ts'],
+  testRunner: 'jest-circus/runner',
+  transform: {
+    '^.+\\.ts$': 'ts-jest'
+  },
+  verbose: true
+}
diff --git a/package-lock.json b/package-lock.json
index 7d3f3a3f..8399a750 100644
--- a/package-lock.json
+++ b/package-lock.json
@@ -1,4 +1,22 @@
+"#": "Branch":"init.defaultBranch":,
+"#": "'@https://github.com/ruby/setup-ruby",
 {
+  "scripts": {
+    "test": "jest",
+    "start": "./node_modules/.bin/node-pg-migrate up && node app.js",
+    "migrate": "./node_modules/.bin/node-pg-migrate"
+  },
+  "devDependencies": {
+    "jest": "^24.8.0"
+  },
+  "dependencies": {
+    "body-parser": "^1.19.0",
+    "cors": "^2.8.5",
+    "dotenv": "^8.2.0",
+    "express": "^4.16.4",
+    "node-pg-migrate": "^5.9.0",
+    "pg": "^8.6.0"
+  },
   "name": "setup-dotnet",
   "version": "1.0.0",
   "lockfileVersion": 1,
@@ -3690,6 +3708,4 @@
       "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-20.2.9.tgz",
       "integrity": "sha512-y11nGElTIV+CT3Zv9t7VKl+Q3hTQoT9a1Qzezhhl6Rp21gJ/IVTW7Z3y9EWXhuUBC2Shnf+DX0antecpAwSP8w==",
       "dev": true
-    }
-  }
-}
+Installing: sun.java.net/API/Adk/SDK.S.E/dl/install/installer/WIZARD/Jdk.J.C./RUNETIME.ENVIROMENT/WinRAR.unzip/.Zip/sec/.direnvironments/blob/macOS-11/20220118.8/images/macos/macos-11-Readme.md
[2004](LICENSE)(invalid)
2001©®™ owner Zachry Tyler Wood agile.js/my.ql/setup-ruby/rake.itest/ci/jest
