import { MasterKeys } from "./config";
const isDev = process.env.NODE_ENV;

module.exports = {
  env: {
    baseUrl: MasterKeys[isDev].baseUrl,
    api: MasterKeys[isDev].api,
    imagesUrl: MasterKeys[isDev].imagesUrl,
  },
  ssr: true,
  mode: "universal",
  target: "server",

  server: {
    host: "0.0.0.0",
    port: 8080,
  },

  head: {
    htmlAttrs: {
      lang: "uk",
    },
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "msapplication-TileColor", content: "#603cba" },
      { name: "theme-color", content: "#ffffff" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/favicon/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon/favicon-16x16.png",
      },
      { rel: "manifest", href: "/favicon/site.webmanifest" },
      {
        rel: "mask-icon",
        href: "/favicon/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
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
  buildModules: ["@nuxtjs/device"],
  styleResources: {
    scss: [
      "~~/assets/scss/variables.scss",
      "~~/assets/scss/mixins.scss",
      "~~/assets/scss/keyframes.scss ",
    ], // alternative: scss
    less: [],
    stylus: [],
  },
  axios: {
    withCredentials: true,
    credentials: true,
  },

  build: {
    // optimizeCss: true,

    // splitChunks: {
    //   layouts: true,
    //   pages: true,
    //   commons: true,
    // },
    // optimization: {
    //   minimize: isDev === "prod",
    // },
    // ...(isDev === "prod" && {
    //   html: {
    //     minify: {
    //       collapseBooleanAttributes: true,
    //       decodeEntities: true,
    //       minifyCSS: true,
    //       minifyJS: true,
    //       processConditionalComments: true,
    //       removeEmptyAttributes: true,
    //       removeRedundantAttributes: true,
    //       trimCustomFragments: true,
    //       // useShortDoctype: true,
    //     },
    //   },
    // }),
    // ...(isDev === "prod" && {
    //   extractCSS: {
    //     ignoreOrder: true,
    //   },
    // }),

    extend(config, ctx) {
      config.resolve = config.resolve || {};
      config.resolve.symlinks = false;
    },
  },
};
