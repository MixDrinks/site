<template>
    <main class="wrapper">
        <CocktailsPage
            @loadMore="loadMore"
            @updateCoctails="updateCoctails"
            :cocktails="cocktails"
            :filters="filters"
            :info="info"
        />
    </main>
</template>

<script>
import { definePageMeta } from '#imports'
import { onBeforeMount, defineComponent, unref, computed } from 'vue'
import { useAsyncData, useNuxtApp, useRoute } from 'nuxt/app'
import { getFilters, getCoctails } from '~~/api/pages'
import { store } from '~~/store/filter'
import { querySTR } from '~~/utils/querySTR'

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
            store.actions.setFiltersIsOpenList(unref(data).filters)

        onBeforeMount(() => setOpenList())

        const { $fetchWIXUP } = useNuxtApp()
        const route = useRoute()

        const getPath = () => route.fullPath

        const { data, refresh } = await useAsyncData(async () => {
            const [cocktailsPage, filters] = await Promise.all([
                getCoctails(getPath(), $fetchWIXUP),
                getFilters()
            ])
            return { cocktailsPage, filters }
        })

        async function loadMore() {
            const { cocktails } = await getCoctails(getPath(), $fetchWIXUP)
            data.value.cocktailsPage.cocktails = [
                ...unref(data).cocktailsPage.cocktails,
                ...cocktails
            ]
        }

        const cocktails = computed(() => unref(data).cocktailsPage.cocktails)
        const futureCounts = computed(
            () => unref(data).cocktailsPage.futureCounts
        )
        const info = computed(() => ({
            title: unref(data).cocktailsPage.description,
            cocktailsCount: unref(data).cocktailsPage.totalCount,
            isIndex: unref(data).cocktailsPage.isAddToIndex
        }))
        const futureFilters = computed(() => {
            const futureFilters = {}
            for (const filter in unref(futureCounts)) {
                futureFilters[filter] = {}
                unref(futureCounts)[filter].forEach((filterItem) => {
                    futureFilters[filter][filterItem.id] = filterItem
                })
            }
            return futureFilters
        })
        let query = querySTR(route, true)
        const updateCoctails = () => {
            refresh()
            query = querySTR(route, true)
        }

        const filters = computed(() => {
            return unref(data).filters.map((filterItem) => ({
                ...filterItem,
                items: filterItem.items
                    .map((item) => {
                        const newValue =
                            unref(futureFilters)[filterItem.id][item.id]

                        return {
                            ...item,
                            url: `/${newValue.query}${query}`,
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
            filters,
            info,
            cocktails,
            route,
            updateCoctails
        }
    }
})
</script>

<style lang="scss" scoped>
.wrapper {
    @include defaultWrapper;
}
</style>
