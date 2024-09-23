<template>
    <main class="wrapper">
        <ItemsPage
            :cocktailsFull="cocktailsFull"
            :items="items"
            @updatePage="updatePage"
        />
    </main>
</template>

<script>
import ItemsPage from '~~/components/items/ItemsPage'
export default {
    components: {
        ItemsPage,
    },
    async asyncData({ route, error, query, $axios }) {
        let page = ''
        if (!!!Object.keys(query).length) {
            page = ''
        } else if (!!Object.keys(query).length && !!!query.page) {
            page = ''
        } else {
            page = `?page=${query.page}`
        }
        const itemsPromise = $axios
            .get(`${route.path}`, { withCredentials: false })
            .catch(() => {
                return error({
                    statusCode: 404,
                    message: 'This page could not be found',
                })
            })
        const cocktailsFullPromise = $axios
            .get(`/filter/goods=${route.params.id}${page}`)
            .catch(() => {
                return error({
                    statusCode: 404,
                    message: 'This page could not be found',
                })
            })
        const [cocktailsFull, items] = await Promise.all([
            cocktailsFullPromise,
            itemsPromise,
        ])
        return {
            cocktailsFull: cocktailsFull.data,
            items: items.data,
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
            let items = [...this.cocktailsFull.cocktails]

            let page = ''
            if (!!!Object.keys(this.$nuxt.$route.query).length) {
                page = ''
            } else if (
                !!Object.keys(this.$nuxt.$route.query).length &&
                !!!this.$nuxt.$route.query.page
            ) {
                page = ''
            } else {
                page = `?page=${this.$nuxt.$route.query.page}`
            }
            const cocktails = await this.$axios.get(
                `/filter/goods=${this.$nuxt.$route.params.id}${page}`
            )
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
            title: `Дізнайся в яких коктейлях 🍸 використовується ${this.items.name}`,
            link: [{ rel: 'canonical', href: this.canonical }],
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: `${this.items.name} використовується в представлених коктейлях 🍸 наведені рецепти та фото`,
                },
                {
                    hid: 'og:title',
                    name: 'og:title',
                    content: `Дізнайся в яких коктейлях 🍸 використовується ${this.items.name}`,
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: `${this.items.name} використовується в представлених коктейлях 🍸 наведені рецепти та фото`,
                },
                {
                    hid: 'og:url',
                    property: 'og:url',
                    content: `${this.canonical}`,
                },
                {
                    hid: 'og:image',
                    property: 'og:image',
                    content: `${this.items.meta.ogImage}`,
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
