import { defineNuxtConfig } from 'nuxt/config'
import { MasterKeys } from './config'
import { schemaOrganization, schemaWebSite } from './utils/schema'

const isDev = process.env.NODE_ENV
const year = 60 * 60 * 24 * 365

export default defineNuxtConfig({
    devtools: { enabled: MasterKeys[isDev].devtools },

    imports: {
        autoImport: false
    },

    experimental: {
        buildCache: true
    },

    build: {
        treeShake: true,
        extractCSS: true,
        optimization: {
            splitChunks: {
                layouts: true,
                pages: true,
                commons: true
            }
        }
    },

    nitro: {
        compressPublicAssets: true,
        routeRules: {
            '/img/**': {
                headers: {
                    'cache-control': `public,max-age=${year},s-maxage=${year}`
                }
            },
            '/scripts/**': {
                headers: {
                    'cache-control': `public,max-age=${year},s-maxage=${year}`
                }
            }
        },
        storage: {
            cache: {
                driver: 'redis'
            }
        },
        compress: {
            brotli: {
                enabled: true,
                zlevel: 11
            },
            gzip: {
                enabled: true,
                level: 9
            }
        }
    },

    ssr: true,

    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
        head: {
            htmlAttrs: {
                lang: 'uk'
            },
            title: 'MixDrinks',
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1'
                },
                { name: 'msapplication-TileColor', content: '#603cba' },
                { name: 'theme-color', content: '#ffffff' },
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Рецепти коктейлів на сайті MixDrinks'
                }
            ],
            link: [
                {
                    rel: 'apple-touch-icon',
                    sizes: '180x180',
                    href: '/favicon/apple-touch-icon.png'
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '32x32',
                    href: '/favicon/favicon-32x32.png'
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '16x16',
                    href: '/favicon/favicon-16x16.png'
                },
                { rel: 'manifest', href: '/favicon/site.webmanifest' },
                {
                    rel: 'mask-icon',
                    href: '/favicon/safari-pinned-tab.svg',
                    color: '#5bbad5'
                },
                {
                    rel: 'preconnect',
                    href: MasterKeys[isDev].cdn
                }
            ],
            script: [
                {
                    async: true,
                    src: 'https://www.googletagmanager.com/gtag/js?id=G-8DWKDM4NCR'
                },
                {
                    async: true,
                    src: '/scripts/googleAnalytics.js'
                },
                {
                    async: true,
                    type: 'application/ld+json',
                    children: JSON.stringify(schemaOrganization)
                },
                {
                    async: true,
                    type: 'application/ld+json',
                    children: JSON.stringify(schemaWebSite)
                }
            ]
        }
    },

    router: {
        prefetchLinks: false
    },

    modules: ['nuxt-simple-sitemap', '@nuxt/eslint'],
    css: ['~~/assets/css/index.css'],

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @import "./assets/scss/variables.scss";
                        @import "./assets/scss/mixins.scss";
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
        sources: ['/api/sitemap'],
        exclude: [
            '/admin/**',
        ]
    },

    eslint: {},
    compatibilityDate: '2024-10-01'
})
