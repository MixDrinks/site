<template>
    <main class="wrapper">
        <BlogPage :posts="data.posts" />
    </main>
</template>

<script>
import { useHead, useRoute, useAsyncData } from 'nuxt/app'
import { defineComponent } from 'vue'
import { querySTR } from '~~/utils/querySTR'
import { getPosts } from '~~/api/pages'

import BlogPage from '~~/components/blog/BlogPage.vue'
import { throwIfPageError } from '~~/utils/pageError'

export default defineComponent({
    name: 'BlogPage',
    components: { BlogPage },

    async setup() {
        useHead({
            meta: [{ name: 'robots', content: 'noindex, nofollow' }]
        })
        const route = useRoute()
        const getPath = () => `/${querySTR(route)}`

        const { data, error } = await useAsyncData(() => getPosts(getPath()))
        throwIfPageError(error)

        return {
            data
        }
    }
})
</script>

<style lang="scss" scoped>
.wrapper {
    @include defaultWrapper;
}
</style>
