<template>
    <main class="wrapper">
        <CocktailsPage
            @loadMore="loadMore"
            @updateCoctails="refresh"
            :cocktailsFull="data.cocktailsFull"
            :allFilters="data.allFilters"
        />
    </main>
</template>

<script>
import { definePageMeta } from '#imports'
import { defineComponent, unref } from 'vue'
import { useAsyncData, useNuxtApp, useRoute } from 'nuxt/app'
import { getFilters, getCoctails } from '~~/api/pages'

import CocktailsPage from '~~/components/cocktails/CocktailsPage.vue'

export default defineComponent({
    name: 'FilterPage',
    components: {
        CocktailsPage
    },

    async setup() {
        definePageMeta({
            pageTransition: {
                name: 'none'
            }
        })
        
        const { $fetchWIXUP } = useNuxtApp()
        const route = useRoute()

        const getPath = () => route.fullPath

        const { data, refresh } = await useAsyncData(async () => {
            const [cocktailsFull, allFilters] = await Promise.all([
                getCoctails(getPath(), $fetchWIXUP),
                getFilters()
            ])
            return { cocktailsFull, allFilters }
        })

        async function loadMore() {
            const { cocktails } = await getCoctails(getPath(), $fetchWIXUP)
            data.value.cocktailsFull.cocktails = [
                ...unref(data).cocktailsFull.cocktails,
                ...cocktails
            ]
        }

        return {
            data,
            loadMore,
            refresh
        }
    }
})
</script>

<style lang="scss" scoped>
.wrapper {
    @include defaultWrapper;
}
</style>
