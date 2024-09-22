<template>
    <main class="wrapper">
        <BlogPage :postsData="postFull" @updatePage="updatePage" />
    </main>
</template>

<script>
import BlogPage from '~~/components/blog/BlogPage.vue'
export default {
    scrollToTop: false,
    components: {
        BlogPage,
    },
    async asyncData({ query, error, $axios }) {
        let page = ''
        if (!!!Object.keys(query).length) {
            page = '?page=0'
        } else if (!!Object.keys(query).length && !!!query.page) {
            page = '&page=0'
        }
        const postFullPromise = $axios
            .get(`/blog/post-list${page}`)
            .catch(() => {
                return error({
                    statusCode: 404,
                    message: 'This page could not be found',
                })
            })
        const [postFull] = await Promise.all([postFullPromise])
        return {
            postFull: postFull.data,
        }
    },
    beforeMount() {
        window.addEventListener('popstate', this.updatePage, false)
    },
    beforeDestroy() {
        window.removeEventListener('popstate', this.updatePage, false)
    },
    methods: {
        async updatePage(payload) {
            // this.startLoading()
            let page = ''
            if (!!!Object.keys(this.$nuxt.$route.query).length) {
                page = '?page=0'
            } else if (
                !!Object.keys(this.$nuxt.$route.query).length &&
                !!!this.$nuxt.$route.query.page
            ) {
                page = '&page=0'
            }
            let items = [...this.postFull.posts]
            const post = await this.$axios.get(`/blog/post-list${page}`)
            this.postFull = { ...posts.data }
            if (payload?.loadMore) {
                this.postFull.posts = [...items, ...this.postFull.posts]
            }
            // this.endLoading()
        },
    },
    computed: {
        canonical() {
            return process.env.baseUrl + this.$nuxt.$route.path
        },
        indexPage() {
            if (Object.entries(this.$nuxt.$route.query).length === 0) {
                return 'index, follow'
            } else {
                return 'noindex, nofollow'
            }
        },
    },
    head() {
        return {
            title: 'Блог',
            link: [{ rel: 'canonical', href: this.canonical }],
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Блог',
                },
                {
                    hid: 'og:title',
                    name: 'og:title',
                    content: 'Блог',
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: 'Блог',
                },
                {
                    hid: 'og:url',
                    property: 'og:url',
                    content: `${this.canonical}`,
                },
                { name: 'robots', content: 'noindex, nofollow' },
            ],
        }
    },
}
</script>

<style lang="scss" scoped>
.wrapper {
    @include defaultWrapper;
}
</style>
