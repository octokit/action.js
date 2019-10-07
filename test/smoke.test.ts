// These environment variables to exist on import time
process.env.GITHUB_TOKEN = "secret123";
process.env.GITHUB_ACTION = "test";

import { Octokit } from "../src";

describe("Smoke test", () => {
  it("is a function", () => {
    expect(Octokit).toBeInstanceOf(Function);
    expect(() => new Octokit()).not.toThrow();
  });
});
