<template>
    <main class="wrapper">
        <CocktailPage :cocktail="cocktail" />
    </main>
</template>

<script>
import CocktailPage from '~/components/cocktails/CocktailPage'
export default {
    components: {
        CocktailPage,
    },
    async asyncData({ route, error, $axios }) {
        const cocktail = await $axios
            .get(`/v2/cocktail/${route.params.id}`)
            .catch(() => {
                return error({
                    statusCode: 404,
                    message: 'This page could not be found',
                })
            })

        return {
            cocktail: cocktail.data,
        }
    },
    computed: {
        canonical() {
            return process.env.baseUrl + this.$nuxt.$route.path
        },
    },
    head() {
        return {
            title: `Коктейль ${this.cocktail.name} 🍹 приготування в домашніх умовах за рецептом`,
            link: [{ rel: 'canonical', href: this.canonical }],
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: `Як приготувати коктейль ${this.cocktail.name} 🍹 в домашніх умовах, всі інгрідієнти які вам потрібні та рецепт для коктейля наведені на сторінці!`,
                },
                {
                    hid: 'og:title',
                    name: 'og:title',
                    content: `Коктейль ${this.cocktail.name} 🍹 приготування в домашніх умовах за рецептом`,
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: `Як приготувати коктейль ${this.cocktail.name} 🍹 в домашніх умовах, всі інгрідієнти які вам потрібні та рецепт для коктейля наведені на сторінці!`,
                },
                {
                    hid: 'og:url',
                    property: 'og:url',
                    content: `${this.canonical}`,
                },
                { name: 'robots', content: 'index, follow' },
            ],
        }
    },
    mounted() {
        this.$axios.post(`/v2/cocktails/visit?id=${this.cocktail.id}`)
    },
}
</script>

<style lang="scss" scoped>
.wrapper {
    @include defaultWrapper;
}
</style>
