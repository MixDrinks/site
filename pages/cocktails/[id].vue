<template>
    <main class="wrapper">
        <CocktailPage :cocktail="cocktail" />
    </main>
</template>

<script>
import { defineComponent } from 'vue'
import { useRoute, useNuxtApp, useAsyncData } from 'nuxt/app'

import CocktailPage from '~~/components/cocktail/CocktailPage.vue'

export default defineComponent({
    name: 'Cocktail',
    components: {
        CocktailPage
    },
    async setup() {
        const { $fetchWIXUP } = useNuxtApp()
        const route = useRoute()
        const { data: cocktail } = await useAsyncData('coctail-page', () =>
            $fetchWIXUP(
                `https://newapi.mixdrinks.org/api/cocktail/${route.params.id}`
            )
        )
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
