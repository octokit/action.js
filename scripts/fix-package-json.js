// Script to fix the package.json files map. This is needed because npm changed the file matching behavior in npm@9
// https://github.com/octokit/action.js/pull/494
const fs = require("fs");
const path = require("path");
const { EOL } = require("os");

const pkgPath = path.join(__dirname, "../pkg/package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

pkg.files = pkg.files.map((file) => {
  if (file.endsWith("/")) {
    return file + "**";
  }
  return file;
});

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + EOL, "utf8");
