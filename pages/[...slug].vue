<template>
    <main class="wrapper">
        <CocktailsPage
            @loadMore="loadMore"
            :cocktails="cocktails"
            :filters="filters"
            :info="info"
        />
    </main>
</template>

<script>
import { definePageMeta } from '#imports'
import {
    onBeforeMount,
    defineComponent,
    unref,
    computed,
    ref,
    watch
} from 'vue'
import { useAsyncData, useNuxtApp, useRoute } from 'nuxt/app'
import { getFilters, getCoctails } from '~~/api/pages'
import { filterStore } from '~~/store/filter'
import { querySTR } from '~~/utils/querySTR'

import CocktailsPage from '~~/components/cocktails/CocktailsPage.vue'
import { throwIfPageError } from '~~/utils/pageError'

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

        const route = useRoute()
        let query = querySTR(route, true)

        const isLoadMore = ref(false)
        const loadMore = () => (isLoadMore.value = true)
        watch(route, () => {
            if (unref(isLoadMore)) {
                addCocktails()
                isLoadMore.value = false
            } else {
                refresh()
                query = querySTR(route, true)
            }
        })

        const setOpenList = () =>
            filterStore.actions.setFiltersIsOpenList(unref(filtersData))
        onBeforeMount(() => setOpenList())

        const { $fetchWIXUP } = useNuxtApp()
        const getPath = () => route.fullPath

        // Filter definitions do not depend on the URL, so they are fetched
        // once; only the cocktail list is refetched when filters change.
        const [
            { data, refresh, error },
            { data: filtersData, error: filtersError }
        ] = await Promise.all([
            useAsyncData('filter-cocktails', () =>
                getCoctails(getPath(), $fetchWIXUP)
            ),
            useAsyncData('filter-groups', () => getFilters())
        ])
        throwIfPageError(error)
        throwIfPageError(filtersError)

        async function addCocktails() {
            const { cocktails } = await getCoctails(getPath(), $fetchWIXUP)
            data.value.cocktails = [...unref(data).cocktails, ...cocktails]
        }

        const cocktails = computed(() => unref(data)?.cocktails || [])
        const futureCounts = computed(() => unref(data)?.futureCounts || {})

        const info = computed(() => ({
            title: unref(data)?.description,
            cocktailsCount: unref(data)?.totalCount,
            isIndex: unref(data)?.isAddToIndex
        }))

        const getRel = (value) => (value ? 'tag' : 'nofollow')
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

        const filters = computed(() => {
            return (unref(filtersData) || []).map((filterItem) => ({
                ...filterItem,
                items: filterItem.items
                    .map((item) => {
                        const newValue = unref(futureFilters)[filterItem.id]?.[
                            item.id
                        ] || {
                            query: '',
                            count: 0,
                            isActive: false,
                            isAddToIndex: false
                        }

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

        return {
            loadMore,
            filters,
            info,
            cocktails,
            route
        }
    }
})
</script>

<style lang="scss" scoped>
.wrapper {
    @include defaultWrapper;
}
</style>
