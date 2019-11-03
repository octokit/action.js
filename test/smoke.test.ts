import { Octokit } from "../src";

describe("Smoke test", () => {
  it("happy path", () => {
    process.env.GITHUB_TOKEN = "secret123";
    process.env.GITHUB_ACTION = "test";

    expect(Octokit).toBeInstanceOf(Function);
    expect(() => new Octokit()).not.toThrow();
  });

  it("throws if GITHUB_TOKEN is not set", () => {
    delete process.env.GITHUB_TOKEN;
    process.env.GITHUB_ACTION = "test";

    expect(Octokit).toBeInstanceOf(Function);
    expect(() => new Octokit()).toThrow(
      "[@octokit/auth-action] `GITHUB_TOKEN` environment variable is not set. See https://help.github.com/en/articles/virtual-environments-for-github-actions#github_token-secret"
    );
  });

  it("throws if GITHUB_ACTION is not set", () => {
    process.env.GITHUB_TOKEN = "secret123";
    delete process.env.GITHUB_ACTION;

    expect(Octokit).toBeInstanceOf(Function);
    expect(() => new Octokit()).toThrow(
      "[@octokit/auth-action] `GITHUB_ACTION` environment variable is not set. @octokit/auth-action is meant to be used in GitHub Actions only."
    );
  });

  it("It works when extended with another .plugin() call", () => {
    process.env.GITHUB_TOKEN = "secret123";
    process.env.GITHUB_ACTION = "test";

    const MyOctokit = Octokit.plugin(() => {
      return { foo: "bar" };
    });
    const octokit = new MyOctokit();
    expect(typeof octokit.paginate).toBe("function");
    expect(octokit.foo).toBe("bar");
  });
});
