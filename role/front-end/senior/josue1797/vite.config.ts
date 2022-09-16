import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Components from "unplugin-vue-components/vite";
import { Vuetify3Resolver } from "unplugin-vue-components/resolvers";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      dts: true,
      dirs: ["src/components"],
      deep: true,
      types: [
        {
          from: "vue-router",
          names: ["RouterLink", "RouterView"],
        },
      ],
      resolvers: [Vuetify3Resolver()],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
    VitePWA({
      filename: "sw.ts",
      includeAssets: ["*.svg"],
      includeManifestIcons: false,
      injectRegister: false,
      manifest: {
        name: "Travelers",
        short_name: "Travelers",
        description: "Create many travel notebook.",
        theme_color: "#ced4da",
        icons: [
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon-512-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      srcDir: "src/service-worker",
      strategies: "injectManifest",
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
  },
  root: ".",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
