import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts"],
  outDir: "dist",
  format: ["esm"],
  target: "node20",
  splitting: false,
  bundle: true,
  clean: true,
});
