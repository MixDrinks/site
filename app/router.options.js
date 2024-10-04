import { useNuxtApp } from 'nuxt/app'

export default {
    scrollBehavior(to, from, savedPosition) {
        const nuxtApp = useNuxtApp()

        if (savedPosition) {
            return savedPosition
        }

        if (to.name === 'slug') {
            return false
        }

        // if (to.hash) {
        //     return {
        //         el: to.hash,
        //         behavior: 'smooth',
        //     };
        // }

        return new Promise((resolve) => {
            nuxtApp.hooks.hookOnce('page:finish', () => {
                resolve({
                    top: 0
                })
            })
        })
    }
}
