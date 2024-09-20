<template>
    <main class="wrapper">
        <CocktailPage :cocktail="cocktail" />
    </main>
</template>

<script>
import CocktailPage from '~~/components/cocktails/CocktailPage'
export default {
    components: {
        CocktailPage,
    },
    async asyncData({ route, error, $axios }) {
        const cocktail = await $axios
            .get(`/cocktail/${route.params.id}`, { withCredentials: false })
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
        description() {
            return `Як приготувати коктейль ${this.cocktail.name} 🍹 в домашніх умовах, всі інгрідієнти які вам потрібні та рецепт для коктейля наведені на сторінці!`
        },
        recipeIngredient() {
            return this.cocktail.goods.map((good) => good.name)
        },
        recipeInstructions() {
            return this.cocktail.receipt
        },
        schemaRecipe() {
            return {
                '@context': 'https://schema.org',
                '@type': 'Recipe',
                name: this.cocktail.name,
                author: 'mixdrinks',
                description: this.description,
                image: this.cocktail.meta.ogImage,
                recipeIngredient: this.recipeIngredient,
                recipeInstructions: this.recipeInstructions,
                recipeCategory: 'Коктейлі',
                aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: Number(this.cocktail.rating.toFixed(1)),
                    ratingCount: this.cocktail.ratingCount,
                    bestRating: 5,
                },
            }
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
                    content: this.description,
                },
                {
                    hid: 'og:title',
                    name: 'og:title',
                    content: `Коктейль ${this.cocktail.name} 🍹 приготування в домашніх умовах за рецептом`,
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
                {
                    hid: 'og:image',
                    property: 'og:image',
                    content: `${this.cocktail.meta.ogImage}`,
                },
                { name: 'robots', content: 'index, follow' },
            ],
            script: [
                {
                    type: 'application/ld+json',
                    json: this.schemaRecipe,
                },
            ],
        }
    },
    mounted() {
        this.$axios.post(`/cocktail/${this.cocktail.slug}/visit`, {
            withCredentials: true,
        })
    },
}
</script>

<style lang="scss" scoped>
.wrapper {
    @include defaultWrapper;
}
</style>
