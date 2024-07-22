<template>
    <main class="wrapper">
        <BlogPage :postFull="postFull" @updateCocktails="updateCocktails" />
    </main>
</template>

<script>
import BlogPage from '~~/components/cocktails/BlogPage'
export default {
    scrollToTop: false,
    components: {
        BlogPage,
    },
    async asyncData({ query, error, route, $axios }) {
        let page = ''
        if (!!!Object.keys(query).length) {
            page = '?page=0'
        } else if (!!Object.keys(query).length && !!!query.page) {
            page = '&page=0'
        }
        const postFullPromise = $axios
            .get(`/api/blog/post-list${page}`)
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
        window.addEventListener('popstate', this.updateCocktails, false)
    },
    beforeDestroy() {
        window.removeEventListener('popstate', this.updateCocktails, false)
    },
    methods: {
        async updateCocktails(payload) {
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
            const post = await this.$axios.get(`/api/blog/post-list${page}`)
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
            title: 'Колекція коктейлів 🍹 та рецептів до них в домашніх умовах',
            link: [{ rel: 'canonical', href: this.canonical }],
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content:
                        'Коктейлі алкогольні 🍸 та безалкогольні 🍹 з фото та рецептами, оберий який подобаєтья тобі',
                },
                {
                    hid: 'og:title',
                    name: 'og:title',
                    content:
                        'Колекція коктейлів 🍹 та рецептів до них в домашніх умовах',
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content:
                        'Коктейлі алкогольні 🍸 та безалкогольні 🍹 з фото та рецептами, оберий який подобаєтья тобі',
                },
                {
                    hid: 'og:url',
                    property: 'og:url',
                    content: `${this.canonical}`,
                },
                { name: 'robots', content: this.indexPage },
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
