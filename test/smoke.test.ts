import fetchMock from "fetch-mock";

import { Octokit } from "../src";

describe("Smoke test", () => {
  beforeEach(() => {
    delete process.env.GITHUB_TOKEN;
    delete process.env.INPUT_GITHUB_TOKEN;
    delete process.env.GITHUB_ACTION;
    delete process.env.GITHUB_API_URL;
  });

  it("happy path with GITHUB_TOKEN", () => {
    process.env.GITHUB_TOKEN = "secret123";
    process.env.GITHUB_ACTION = "test";

    expect(Octokit).toBeInstanceOf(Function);
    expect(() => new Octokit()).not.toThrow();
  });

  it("happy path with INPUT_GITHUB_TOKEN", () => {
    process.env.INPUT_GITHUB_TOKEN = "secret123";
    process.env.GITHUB_ACTION = "test";

    expect(Octokit).toBeInstanceOf(Function);
    expect(() => new Octokit()).not.toThrow();
  });

  it("happy path with GITHUB_API_URL", () => {
    process.env.GITHUB_TOKEN = "secret123";
    process.env.GITHUB_ACTION = "test";
    process.env.GITHUB_API_URL = "https://10.1.1.1/api/v3";

    expect(Octokit).toBeInstanceOf(Function);
    expect(() => new Octokit()).not.toThrow();
  });

  it("throws if neither GITHUB_TOKEN nor INPUT_GITHUB_TOKEN are set", () => {
    process.env.GITHUB_ACTION = "test";

    expect(Octokit).toBeInstanceOf(Function);
    expect(() => new Octokit()).toThrow(
      "[@octokit/auth-action] `GITHUB_TOKEN` variable is not set. It must be set on either `env:` or `with:`. See https://github.com/octokit/auth-action.js#createactionauth"
    );
  });

  it("throws if GITHUB_ACTION is not set", () => {
    process.env.GITHUB_TOKEN = "secret123";

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

  it("README example: create issue using octokit.request()", async () => {
    process.env.GITHUB_TOKEN = "secret123";
    process.env.GITHUB_ACTION = "test";

    const mock = fetchMock.sandbox().post(
      "path:/repos/octocat/hello-world/issues",
      { ok: true },
      {
        body: {
          title: "My test issue",
        },
      }
    );

    const octokit = new Octokit({
      auth: "secret123",
      request: {
        fetch: mock,
      },
    });

    // See https://developer.github.com/v3/issues/#create-an-issue
    const { data } = await octokit.request(
      "POST /repos/{owner}/{repo}/issues",
      {
        owner: "octocat",
        repo: "hello-world",
        title: "My test issue",
      }
    );

    expect(data).toStrictEqual({ ok: true });
  });

  it("README example: create issue using octokit.issues.create()", async () => {
    process.env.GITHUB_TOKEN = "secret123";
    process.env.GITHUB_ACTION = "test";

    const mock = fetchMock.sandbox().post(
      "path:/repos/octocat/hello-world/issues",
      { ok: true },
      {
        body: {
          title: "My test issue",
        },
      }
    );

    const octokit = new Octokit({
      auth: "secret123",
      request: {
        fetch: mock,
      },
    });

    // See https://developer.github.com/v3/issues/#create-an-issue
    const { data } = await octokit.issues.create({
      owner: "octocat",
      repo: "hello-world",
      title: "My test issue",
    });

    expect(data).toStrictEqual({ ok: true });
  });

  it("README example: create issue using octokit.graphql", async () => {
    process.env.GITHUB_TOKEN = "secret123";
    process.env.GITHUB_ACTION = "test";

    const query = `mutation($repositoryId:ID!, $title:String!) {
      createIssue(input:{repositoryId: $repositoryId, title: $title}) {
        issue {
          number
        }
      }
    }`;

    const mock = fetchMock.sandbox().post(
      "path:/graphql",
      { data: { ok: true } },
      {
        body: {
          query,
          variables: {
            repositoryId: 123,
            title: "My test issue",
          },
        },
      }
    );

    const octokit = new Octokit({
      auth: "secret123",
      request: {
        fetch: mock,
      },
    });

    // See https://developer.github.com/v3/issues/#create-an-issue
    const data = await octokit.graphql(query, {
      repositoryId: 123,
      title: "My test issue",
    });

    expect(data).toStrictEqual({ ok: true });
  });
});
