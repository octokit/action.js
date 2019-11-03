import { Octokit as Core } from "@octokit/core";
import { createActionAuth } from "@octokit/auth-action";
import { paginateRest } from "@octokit/plugin-paginate-rest";

import { VERSION } from "./version";

const CoreWithPlugins = Core.plugin([paginateRest]);

// Workaround for TypeScript bug, see https://github.com/octokit/core.js#a-note-on-typescript
import {
  OctokitOptions,
  OctokitPlugin,
  ReturnTypeOf,
  Constructor
} from "@octokit/core";

/* istanbul ignore next */
class CoreWithPluginsWorkaround extends CoreWithPlugins {
  static plugin<T extends OctokitPlugin | OctokitPlugin[]>(pluginOrPlugins: T) {
    const currentPlugins = this.plugins;
    const newPlugins = Array.isArray(pluginOrPlugins)
      ? pluginOrPlugins
      : [pluginOrPlugins];

    const NewOctokit = class extends this {
      static plugins = currentPlugins.concat(
        newPlugins.filter(plugin => !currentPlugins.includes(plugin))
      );
    };

    return NewOctokit as typeof NewOctokit & Constructor<ReturnTypeOf<T>>;
  }

  static defaults(defaults: OctokitOptions) {
    return class OctokitWithDefaults extends this {
      constructor(options: OctokitOptions = {}) {
        super(Object.assign({}, defaults, options));
      }
    };
  }
}

export const Octokit = CoreWithPluginsWorkaround.defaults({
  authStrategy: createActionAuth,
  userAgent: `octokit-action.js/${VERSION}`
});
