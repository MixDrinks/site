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

export default defineComponent({
    name: 'Cocktail',
    components: {
        CocktailPage
    },
    async setup() {
        const { $fetchWIXUP } = useNuxtApp()
        const route = useRoute()

        const getPath = () => `/${route.params.id}`

        const { data: cocktail } = await useAsyncData(() => getCocktail(getPath(), $fetchWIXUP))
        
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
