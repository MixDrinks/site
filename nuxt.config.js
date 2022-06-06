import { MasterKeys } from "./config";
const isDev = process.env.NODE_ENV ? "dev" : "prod";

export default {
  env: {
    baseUrl: MasterKeys[isDev].baseUrl,
    api: MasterKeys[isDev].api,
    imagesUrl: MasterKeys[isDev].imagesUrl,
  },
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",

  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "robots", content: "noindex, nofollow" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  router: {
    prefetchLinks: false,
  },
  loading: { color: "#fc6d1d" },
  /*
   ** Global CSS
   */
  css: ["~~assets/css/index.css"],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/style-resources"],
  styleResources: {
    // your settings here
    scss: ["~~/assets/scss/variables.scss", "~~/assets/scss/mixins.scss"], // alternative: scss
    less: [],
    stylus: [],
  },
  axios: {
    withCredentials: true,
    credentials: true,
    // See https://github.com/nuxt-community/axios-module#options
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extend(config, ctx) {
      config.resolve = config.resolve || {};
      config.resolve.symlinks = false;
    },
  },
};
