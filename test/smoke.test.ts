import fetchMock from "fetch-mock";
import { createServer, type Server } from "https";
import { Octokit, getProxyAgent, customFetch } from "../src";
import { ProxyAgent } from "undici";

// mock undici such that we can substitute our own fetch implementation
// but use the actual ProxyAgent implementation for most tests. the
// exception is "should call undiciFetch with the correct dispatcher"
// where we want to validate that a mocked ProxyAgent is passed through
// to undici.fetch.
jest.mock("undici", () => {
  return {
    fetch: jest.fn(),
    ProxyAgent: jest.requireActual("undici").ProxyAgent,
  };
});
const undici = jest.requireMock("undici");

describe("Smoke test", () => {
  let server: Server;

  beforeAll((done) => {
    server = createServer(
      {
        requestCert: false,
        rejectUnauthorized: false,
      },
      (request: any, response: any) => {
        expect(request.method).toEqual("GET");
        expect(request.url).toEqual("/");

        response.writeHead(200);
        response.write("ok");
        response.end();
      },
    );

    server.listen(0, done);
  });

  beforeEach(() => {
    delete process.env.GITHUB_TOKEN;
    delete process.env.INPUT_GITHUB_TOKEN;
    delete process.env.GITHUB_ACTION;
    delete process.env.GITHUB_API_URL;
    delete process.env.HTTPS_PROXY;
    delete process.env.https_proxy;
    delete process.env.HTTP_PROXY;
    delete process.env.http_proxy;
  });

  afterAll((done) => {
    server.close(done);
    jest.unmock("undici");
  });

  it("should return a ProxyAgent for the httpProxy environment variable", () => {
    process.env.HTTP_PROXY = "https://127.0.0.1";
    const agent = getProxyAgent();
    expect(agent).toBeInstanceOf(ProxyAgent);
  });

  it("should return a ProxyAgent for the httpsProxy environment variable", () => {
    process.env.HTTPS_PROXY = "https://127.0.0.1";
    const agent = getProxyAgent();
    expect(agent).toBeInstanceOf(ProxyAgent);
  });

  it("should return undefined if no proxy environment variables are set", () => {
    const agent = getProxyAgent();
    expect(agent).toBeUndefined();
  });

  it("Uses the explicitly provided request.agent value if it's provided", async () => {
    process.env.GITHUB_TOKEN = "secret123";
    process.env.GITHUB_ACTION = "test";
    process.env.HTTPS_PROXY = "https://127.0.0.1";

    const fetchSandbox = fetchMock.sandbox();
    const mock = fetchSandbox.post(
      "path:/repos/octocat/hello-world/issues",
      { id: 1 },
      {
        body: {
          title: "My test issue",
        },
      },
    );

    expect(Octokit).toBeInstanceOf(Function);
    const octokit = new Octokit({
      auth: "secret123",
      request: {
        fetch: mock,
      },
    });
    await octokit.request("POST /repos/{owner}/{repo}/issues", {
      owner: "octocat",
      repo: "hello-world",
      title: "My test issue",
    });

    const [call] = fetchSandbox.calls();
    expect(call[0]).toEqual(
      "https://api.github.com/repos/octocat/hello-world/issues",
    );

    fetchMock.restore();
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
      "[@octokit/auth-action] `GITHUB_TOKEN` variable is not set. It must be set on either `env:` or `with:`. See https://github.com/octokit/auth-action.js#createactionauth",
    );
  });

  it("throws if GITHUB_ACTION is not set", () => {
    process.env.GITHUB_TOKEN = "secret123";

    expect(Octokit).toBeInstanceOf(Function);
    expect(() => new Octokit()).toThrow(
      "[@octokit/auth-action] `GITHUB_ACTION` environment variable is not set. @octokit/auth-action is meant to be used in GitHub Actions only.",
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
      { id: 1 },
      {
        body: {
          title: "My test issue",
        },
      },
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
      },
    );

    expect(data.id).toEqual(1);
  });

  it("README example: create issue using octokit.issues.create()", async () => {
    process.env.GITHUB_TOKEN = "secret123";
    process.env.GITHUB_ACTION = "test";

    const mock = fetchMock.sandbox().post(
      "path:/repos/octocat/hello-world/issues",
      { id: 1 },
      {
        body: {
          title: "My test issue",
        },
      },
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

    expect(data.id).toEqual(1);
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
      },
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

    // TODO: need a follow up issue to clean this up
    expect(JSON.stringify(data)).toStrictEqual(JSON.stringify({ ok: true }));
  });

  it.each(["HTTPS_PROXY", "https_proxy", "HTTP_PROXY", "http_proxy"])(
    "Uses ProxyAgent with %s env var",
    async (https_proxy_env) => {
      process.env.GITHUB_TOKEN = "secret123";
      process.env.GITHUB_ACTION = "test";
      process.env[https_proxy_env] = "https://127.0.0.1";

      const fetchSandbox = fetchMock.sandbox();
      const mock = fetchSandbox.post(
        "path:/repos/octocat/hello-world/issues",
        { id: 1 },
        {
          body: {
            title: "My test issue",
          },
        },
      );

      expect(Octokit).toBeInstanceOf(Function);
      const octokit = new Octokit({
        auth: "secret123",
        request: {
          fetch: mock,
        },
      });
      await octokit.request("POST /repos/{owner}/{repo}/issues", {
        owner: "octocat",
        repo: "hello-world",
        title: "My test issue",
      });

      const [call] = fetchSandbox.calls();
      expect(call[0]).toEqual(
        "https://api.github.com/repos/octocat/hello-world/issues",
      );
    },
  );
  describe("customFetch", () => {
    afterAll(() => {
      delete process.env.HTTPS_PROXY;
      jest.clearAllMocks();
    });
    it("should call undiciFetch with the correct dispatcher", async () => {
      process.env.HTTPS_PROXY = "https://127.0.0.1";
      const expectedAgent = new ProxyAgent("https://127.0.0.1");

      jest.mock("../src", () => {
        const actualModule = jest.requireActual("../src");
        return {
          ...actualModule,
          getProxyAgent: jest.fn(() => expectedAgent),
        };
      });
      expect(JSON.stringify(getProxyAgent())).toBe(
        JSON.stringify(expectedAgent),
      );

      // mock undici.fetch to set the `dispatcher` option manually.
      // this allows us to verify that `customFetch` correctly sets
      // the dispatcher to `expectedAgent` when HTTPS_PROXY is set.
      let dispatcher: any;
      (undici.fetch as jest.Mock).mockImplementation(
        (_url: string, options: any) => {
          dispatcher = options.dispatcher;

          return Promise.resolve(new Response());
        },
      );
      await customFetch("http://api.github.com", {});
      expect(JSON.stringify(dispatcher)).toEqual(JSON.stringify(expectedAgent));
    });
  });
});
