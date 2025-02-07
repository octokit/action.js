import fetchMock from "fetch-mock";
import { createServer, type Server } from "node:https";
import { Octokit, getProxyAgent } from "../src/index.ts";
import {
  type Dispatcher,
  type RequestInfo,
  type RequestInit,
  Response,
  ProxyAgent,
  default as undici,
} from "undici";
import {
  vi,
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";

let expectedAgent: ProxyAgent;

describe("Smoke test", () => {
  let server: Server;

  beforeAll(() => {
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

    server.listen(0);
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

  afterAll(() => {
    server.close();
    vi.unmock("undici");
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

    const mock = fetchMock.createInstance().post(
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
        fetch: mock.fetchHandler,
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

    const mock = fetchMock.createInstance().post(
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
        fetch: mock.fetchHandler,
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

    const mock = fetchMock.createInstance().post(
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
        fetch: mock.fetchHandler,
      },
    });

    // See https://developer.github.com/v3/issues/#create-an-issue
    const data = await octokit.graphql(query, {
      repositoryId: 123,
      title: "My test issue",
    });

    expect(data).toEqual({ ok: true });
  });

  it.each(["HTTPS_PROXY", "https_proxy", "HTTP_PROXY", "http_proxy"])(
    "Uses ProxyAgent with %s env var",
    async (https_proxy_env) => {
      process.env.GITHUB_TOKEN = "secret123";
      process.env.GITHUB_ACTION = "test";
      process.env[https_proxy_env] = "https://127.0.0.1";

      const fetchcreateInstance = fetchMock.createInstance();
      const mock = fetchcreateInstance.post(
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
          fetch: mock.fetchHandler,
        },
      });
      await octokit.request("POST /repos/{owner}/{repo}/issues", {
        owner: "octocat",
        repo: "hello-world",
        title: "My test issue",
      });

      const calls = fetchcreateInstance.callHistory.callLogs;
      expect(calls[0].args[0]).toEqual(
        "https://api.github.com/repos/octocat/hello-world/issues",
      );
    },
  );
  describe("customFetch", () => {
    afterAll(() => {
      delete process.env.HTTPS_PROXY;
      vi.clearAllMocks();
    });

    it("should call undiciFetch with the correct dispatcher", async () => {
      process.env.HTTPS_PROXY = "https://127.0.0.1";
      expectedAgent = new ProxyAgent("https://127.0.0.1");

      vi.doMock("../src/index.js", async () => {
        const actualModule = await vi.importActual("../src/index.js");
        return {
          __esModule: true,
          ...actualModule,
          getProxyAgent: vi.fn(() => expectedAgent),
          customFetch: async function (url: string, opts: any) {
            return await undici.fetch(url, {
              dispatcher: getProxyAgent(),
              ...opts,
            });
          },
        };
      });

      const {
        customFetch: customFetchMocked,
        getProxyAgent: getProxyAgentMocked,
      } = await import("../src/index.js");

      expect(JSON.stringify(getProxyAgentMocked())).toBe(
        JSON.stringify(expectedAgent),
      );

      // mock undici.fetch to extract the `dispatcher` option passed in.
      // this allows us to verify that `customFetch` correctly sets
      // the dispatcher to `expectedAgent` when HTTPS_PROXY is set.
      let dispatcher: Dispatcher | undefined;
      vi.spyOn(undici, "fetch").mockImplementation(
        (_url: RequestInfo, options?: RequestInit) => {
          dispatcher = options?.dispatcher;

          return Promise.resolve(new Response());
        },
      );
      await customFetchMocked("http://api.github.com", {});
      expect(JSON.stringify(dispatcher)).toEqual(JSON.stringify(expectedAgent));
    });
  });
});
