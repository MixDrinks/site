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
            store.actions.setFiltersIsOpenList(unref(data).filters)
        onBeforeMount(() => setOpenList())

        const { $fetchWIXUP } = useNuxtApp()
        const getPath = () => route.fullPath

        const { data, refresh } = await useAsyncData(async () => {
            const [cocktailsPage, filters] = await Promise.all([
                getCoctails(getPath(), $fetchWIXUP),
                getFilters()
            ])
            return { cocktailsPage, filters }
        })

        async function addCocktails() {
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

        return {
            data,
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
