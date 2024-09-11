<template>
    <main class="wrapper">
        <CocktailsPage
            :cocktailsFull="cocktailsFull"
            :allFilters="allFilters"
            @updateCocktails="updateCocktails"
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
        const allFiltersPromise = $axios
            .get(`https://api.mixdrinks.org/v2/filters`)
            .catch(() => {
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
