import { defineConfig } from "vite";

export default defineConfig({
  test: {
    coverage: {
      include: ["src/**/*.ts"],
      reporter: ["html"],
      thresholds: {
        lines: 88.88,
        functions: 75,
        statements: 88.88,
      },
    },
  },
});
