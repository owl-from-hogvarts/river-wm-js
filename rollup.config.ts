
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

export default defineConfig({
  input: "./src/example.ts",
  output: {
    file: "./dist/index.js",
    format: "cjs"
  },
  plugins: [
    typescript()
  ]
})
