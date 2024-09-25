import { defineNuxtConfig } from 'nuxt/config'
import { MasterKeys } from "./config";

const isDev = process.env.NODE_ENV;

export default defineNuxtConfig({
    devtools: { enabled: MasterKeys[isDev].devtools },
    imports: {
        autoImport: false
    },
    env: {
        baseUrl: MasterKeys[isDev].baseUrl,
    },
    ssr: true,

    app: {
        head: {
            htmlAttrs: {
                lang: "uk",
            },
            title: process.env.npm_package_name || "",
            meta: [
                { charset: "utf-8" },
                { name: "viewport", content: "width=device-width, initial-scale=1" },
                // { name: "robots", content: "noindex, nofollow" },
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
            script: [
                {
                    src: 'https://www.googletagmanager.com/gtag/js?id=G-8DWKDM4NCR',
                    async: true,
                },
                {
                    src: '/scripts/googleAnalytics.js',
                },
            ],
        },
    },

    router: {
        prefetchLinks: false,
    },

    modules: ['nuxt-simple-sitemap'],

    css: ["~~/assets/css/index.css"],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @import "./assets/scss/variables.scss";
                        @import "./assets/scss/mixins.scss";
                        @import "./assets/scss/keyframes.scss";
                    `
                }
            }
        }
    },

    site: {
        url: 'https://mixdrinks.org/',
        name: 'MixDrinks'
    },
    sitemap: {
        sources: ['https://newapi.mixdrinks.org/api/sitemap']
    }
});
