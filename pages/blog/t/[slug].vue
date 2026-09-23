<template>
    <main class="wrapper">
        <BlogPage :posts="data.posts" />
    </main>
</template>

<script>
import { useHead, useRoute, useAsyncData } from 'nuxt/app'
import { defineComponent } from 'vue'
import { getPostsByTag } from '~~/api/pages'

import BlogPage from '~~/components/blog/BlogPage.vue'
import { throwIfPageError } from '~~/utils/pageError'

export default defineComponent({
    name: 'TagPage',
    components: { BlogPage },

    async setup() {
        useHead({
            meta: [{ name: 'robots', content: 'noindex, nofollow' }]
        })
        const route = useRoute()
        const getPath = () => `/${route.params.slug}`

        const { data, error } = await useAsyncData(() =>
            getPostsByTag(getPath())
        )
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
