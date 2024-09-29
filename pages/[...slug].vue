<template>
    <main class="wrapper">
        <CocktailsPage
            @load-more="loadMore"
            :cocktailsFull="data.cocktailsFull"
            :allFilters="data.allFilters"
        />
    </main>
</template>

<script>
import { defineComponent, unref, watch, ref } from 'vue'
import { useAsyncData, useNuxtApp, useRoute } from 'nuxt/app'

import CocktailsPage from '~~/components/cocktails/CocktailsPage.vue'

export default defineComponent({
    name: 'FilterPage',
    components: {
        CocktailsPage
    },
    async setup() {
        const { $fetchWIXUP } = useNuxtApp()
        const route = useRoute()
        const isLoadMore = ref(false)

        const getFilterRequestPath = (newQuery) => {
            if (newQuery) {
                return `https://newapi.mixdrinks.org/api/filter${route.path}${newQuery}`
            }
            return `https://newapi.mixdrinks.org/api/filter${route.fullPath}`
        }
        watch(route, () => {
            if (!unref(isLoadMore)) {
                refresh()
                setTimeout(() => {
                    window.scrollTo({
                        top: 0,
                        left: 0
                    })
                }, 0)
            }
        })
        const { data, refresh } = await useAsyncData(
            'filter-page',
            async () => {
                const [cocktailsFull, allFilters] = await Promise.all([
                    $fetchWIXUP(getFilterRequestPath()),
                    $fetch('https://newapi.mixdrinks.org/api/filters')
                ])
                return { cocktailsFull, allFilters }
            }
        )

        async function getNewCoctails(newQuery) {
            return await $fetchWIXUP(getFilterRequestPath(newQuery))
        }
        const loadMore = (newQuery) => {
            isLoadMore.value = true
            getNewCoctails(newQuery).then((value) => {
                data.value.cocktailsFull.cocktails = [
                    ...unref(data).cocktailsFull.cocktails,
                    ...value.cocktails
                ]
                isLoadMore.value = false
            })
        }

        return {
            data,
            loadMore
        }
    }
})
</script>

<style lang="scss" scoped>
.wrapper {
    @include defaultWrapper;
}
</style>
