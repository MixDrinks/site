<template>
    <main class="wrapper">
        <CocktailsPage
            @loadMore="loadMore"
            @updateCoctails="refresh"
            :cocktailsFull="data.cocktailsFull"
            :allFilters="allFilters"
        />
    </main>
</template>

<script>
import { definePageMeta } from '#imports'
import { onBeforeMount, defineComponent, unref, computed } from 'vue'
import { useAsyncData, useNuxtApp, useRoute } from 'nuxt/app'
import { getFilters, getCoctails } from '~~/api/pages'
import { store } from '~~/store/filter'
import { query } from '~~/utils/querySTR'

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

        const setOpenList = () =>
            store.actions.setFiltersIsOpenList(unref(data).allFilters)

        onBeforeMount(() => setOpenList())

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

        const allFilters = computed(() => {
            const futureFilters = {}
            for (const filter in unref(data).cocktailsFull.futureCounts) {
                futureFilters[filter] = {}
                unref(data).cocktailsFull.futureCounts[filter].forEach(
                    (filterItem) => {
                        futureFilters[filter][filterItem.id] = filterItem
                    }
                )
            }
            return unref(data).allFilters.map((filterItem) => ({
                ...filterItem,
                items: filterItem.items
                    .map((item) => {
                        const newValue = futureFilters[filterItem.id][item.id]

                        return {
                            ...item,
                            url: `/${newValue.query}${query(route, true)}`,
                            count: newValue.count,
                            rel: getRel(newValue.isAddToIndex),
                            isActive: newValue.isActive,
                            isAddToIndex: newValue.isAddToIndex
                        }
                    })
                    .sort((a, b) => (a.count > b.count ? -1 : 1))
            }))
        })
        const getRel = (value) => (value ? 'tag' : 'nofollow')

        return {
            data,
            loadMore,
            refresh,
            allFilters
        }
    }
})
</script>

<style lang="scss" scoped>
.wrapper {
    @include defaultWrapper;
}
</style>
