import { defineNuxtConfig } from 'nuxt/config'
import { MasterKeys } from './config';
import { schemaOrganization, schemaWebSite } from './utils/schema'

const isDev = process.env.NODE_ENV;

export default defineNuxtConfig({
    devtools: { enabled: MasterKeys[isDev].devtools },
    imports: {
        autoImport: false
    },
    ssr: true,

    app: {
        head: {
            htmlAttrs: {
                lang: "uk",
            },
            title: 'MixDrinks',
            meta: [
                { charset: "utf-8" },
                { name: "viewport", content: "width=device-width, initial-scale=1" },
                { name: "msapplication-TileColor", content: "#603cba" },
                { name: "theme-color", content: "#ffffff" },
                {
                    hid: "description",
                    name: "description",
                    content: "Рецепти коктейлів на сайті MixDrinks",
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
                {
                    rel: "preconnect",
                    href: MasterKeys[isDev].cdn,
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
                {
                    type: 'application/ld+json',
                    children: JSON.stringify(schemaOrganization),
                },
                {
                    type: 'application/ld+json',
                    children: JSON.stringify(schemaWebSite),
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
