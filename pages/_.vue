<template>
    <main class="wrapper">
        <CocktailsPage
            :cocktailsFull="cocktailsFull"
            :allFilters="allFilters"
            @updatePage="updatePage"
        />
    </main>
</template>

<script>
import CocktailsPage from '~~/components/cocktails/CocktailsPage'
export default {
    scrollToTop: false,
    components: {
        CocktailsPage,
    },
    async asyncData({ query, error, route, $axios }) {
        let page = ''
        if (!!!Object.keys(query).length) {
            page = '?page=0'
        } else if (!!Object.keys(query).length && !!!query.page) {
            page = '&page=0'
        }
        const params = route.fullPath.slice(1) + page
        const cocktailsFullPromise = $axios
            .get(`/filter/${params}`)
            .catch(() => {
                return error({
                    statusCode: 404,
                    message: 'This page could not be found',
                })
            })
        const allFiltersPromise = $axios.get(`/filters`).catch(() => {
            return error({
                statusCode: 404,
                message: 'This page could not be found',
            })
        })
        const [cocktailsFull, allFilters] = await Promise.all([
            cocktailsFullPromise,
            allFiltersPromise,
        ])
        return {
            cocktailsFull: cocktailsFull.data,
            allFilters: allFilters.data,
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
            let items = [...this.cocktailsFull.cocktails]
            const params = this.$nuxt.$route.fullPath.slice(1) + page
            const cocktails = await this.$axios.get(`/filter/${params}`)
            this.cocktailsFull = { ...cocktails.data }
            if (payload?.loadMore) {
                this.cocktailsFull.cocktails = [
                    ...items,
                    ...this.cocktailsFull.cocktails,
                ]
            }
            // this.endLoading()
        },
    },
    computed: {
        canonical() {
            return process.env.baseUrl + this.$nuxt.$route.path
        },
        description() {
            return this.cocktailsFull.description
                ? `${this.cocktailsFull.description} 🍸 з фото та рецептами, оберий який подобаєтья тобі`
                : 'Коктейлі алкогольні 🍸 та безалкогольні 🍹 з фото та рецептами, оберий який подобаєтья тобі'
        },
        title() {
            return this.cocktailsFull.description
                ? `${this.cocktailsFull.description} 🍹 та рецепти до них в домашніх умовах`
                : 'Колекція коктейлів 🍹 та рецептів до них в домашніх умовах'
        },
        indexPage() {
            if (this.cocktailsFull.isAddToIndex) {
                return 'index, follow'
            } else {
                return 'noindex, nofollow'
            }
        },
    },
    head() {
        return {
            title: this.title,
            link: [{ rel: 'canonical', href: this.canonical }],
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.description,
                },
                {
                    hid: 'og:title',
                    name: 'og:title',
                    content: this.title,
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: this.description,
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
