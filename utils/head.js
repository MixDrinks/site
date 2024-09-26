import { useHead, useRoute } from "nuxt/app";
import { MasterKeys } from "~~/config";

export const head = ({ title, description, indexPage, scripts, image }) => {
    const route = useRoute();
    const baseUrl = MasterKeys[process.env.NODE_ENV].baseUrl
    const path = route.path === '/' ? '' : route.path

    const robots = indexPage
        ? 'index, follow'
        : 'noindex, nofollow'

    const canonical = `${baseUrl}${path}`

    const ogImage = image ? {
        hid: 'og:image',
        property: 'og:image',
        content: image,
    } : {}

    const headScripts = scripts ? [
        ...scripts
    ] : []

    useHead({
        title: title,
        link: [{ rel: 'canonical', href: canonical }],
        meta: [
            {
                hid: 'description',
                name: 'description',
                content: description,
            },
            {
                hid: 'og:title',
                name: 'og:title',
                content: title,
            },
            {
                hid: 'og:description',
                property: 'og:description',
                content: description,
            },
            {
                hid: 'og:url',
                property: 'og:url',
                content: canonical,
            },
            { name: 'robots', content: robots },
            { ...ogImage }
        ],
        script: [
            ...headScripts
        ],
    })
}