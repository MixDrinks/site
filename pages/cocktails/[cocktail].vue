<template>
    <main class="wrapper">
        <CocktailPage :cocktail="cocktail" />
    </main>
</template>

<script>
import { defineComponent } from 'vue'
import { useRoute, useNuxtApp, useAsyncData } from 'nuxt/app'
import { getCocktail } from '~~/api/pages'

import CocktailPage from '~~/components/cocktail/CocktailPage.vue'
import { throwIfPageError } from '~~/utils/pageError'

export default defineComponent({
    name: 'Cocktail',
    components: {
        CocktailPage
    },
    async setup() {
        const { $fetchWIXUP } = useNuxtApp()
        const route = useRoute()

        const getPath = () => `/${route.params.cocktail}`

        const { data: cocktail, error } = await useAsyncData(() =>
            getCocktail(getPath(), $fetchWIXUP)
        )
        throwIfPageError(error)

        return {
            cocktail
        }
    }
})
</script>

<style lang="scss" scoped>
.wrapper {
    @include defaultWrapper;
}
</style>
