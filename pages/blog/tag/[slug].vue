<template>
    <main class="wrapper">
        <BlogPage :posts="posts" />
    </main>
</template>

<script>
import { useHead, useRoute, useAsyncData } from 'nuxt/app'
import { defineComponent } from 'vue'
import { getPostsByTag } from '~~/api/pages'

import BlogPage from '~~/components/blog/BlogPage.vue'

export default defineComponent({
    name: 'BlogPage',
    components: { BlogPage },

    async setup() {
        useHead({
            meta: [{ name: 'robots', content: 'noindex, nofollow' }]
        })
        const route = useRoute()
        const getPath = () => `/${route.params.slug}`

        const { data: response } = await useAsyncData(() => getPostsByTag(getPath()))

        const posts = response.value?.posts || []

        return {
            posts
        }
    }
})
</script>

<style lang="scss" scoped>
.wrapper {
    @include defaultWrapper;
}
</style>
