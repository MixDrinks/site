import { MasterKeys } from "./config";
const isDev = process.env.NODE_ENV ? "dev" : "prod";

module.exports = {
  env: {
    baseUrl: MasterKeys[isDev].baseUrl,
    api: MasterKeys[isDev].api,
    imagesUrl: MasterKeys[isDev].imagesUrl,
  },

  mode: "universal",

  target: "server",

  head: {
    htmlAttrs: {
      lang: `uk`,
    },
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

  css: ["~~assets/css/index.css"],

  plugins: [],

  components: true,

  buildModules: [],

  modules: ["@nuxtjs/axios", "@nuxtjs/style-resources"],
  styleResources: {
    scss: ["~~/assets/scss/variables.scss", "~~/assets/scss/mixins.scss"], // alternative: scss
    less: [],
    stylus: [],
  },
  axios: {
    withCredentials: true,
    credentials: true,
  },

  build: {
    optimizeCss: true,

    splitChunks: {
      layouts: true,
      pages: true,
      commons: true,
    },
    optimization: {
      minimize: isDev === "prod",
    },
    ...(isDev === "prod" && {
      html: {
        minify: {
          collapseBooleanAttributes: true,
          decodeEntities: true,
          minifyCSS: true,
          minifyJS: true,
          processConditionalComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          trimCustomFragments: true,
          useShortDoctype: true,
        },
      },
    }),
    ...(isDev === "prod" && {
      extractCSS: {
        ignoreOrder: true,
      },
    }),

    extend(config, ctx) {
      config.resolve = config.resolve || {};
      config.resolve.symlinks = false;
    },
  },
};
