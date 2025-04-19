import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import postCSSFix100VH from "postcss-100vh-fix";
import topLevelAwait from "vite-plugin-top-level-await";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "https://cdn.jsdelivr.net/gh/nnreader/nnreader.github.io@gh-pages/" : "./",
  plugins: [
    react(),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: "__tla",
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: (i) => `__tla_${i}`,
    }),
    nodePolyfills(),
    basicSsl(),
  ],
  css: {
    postcss: {
      plugins: [postCSSFix100VH],
    },
  },
  build: {
    // 添加 .txt 文件处理规则
    assetsInlineLimit: 0,
  },
});
