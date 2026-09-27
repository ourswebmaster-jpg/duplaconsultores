import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
  {
    extends: [...nextCoreWebVitals],
    rules: { "@next/next/no-img-element": "off" },
  },
]);
