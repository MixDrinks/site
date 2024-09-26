<template>
    <main class="wrapper">
        <ItemsPage
            :cocktailsFull="data.cocktailsFull"
            :items="data.items"
            @loadMore="loadMore"
        />
    </main>
</template>

<script>
import { defineComponent, unref, ref, watch } from 'vue'
import { useAsyncData, useNuxtApp, useRoute } from 'nuxt/app'

import ItemsPage from '~~/components/items/ItemsPage.vue'

export default defineComponent({
    name: 'GoodsPage',
    components: {
        ItemsPage,
    },
    async setup() {
        const { $fetchWIXUP } = useNuxtApp()
        const route = useRoute()
        const baseUrl = `https://newapi.mixdrinks.org/api/filter/goods=${route.params.id}`
        const isLoadMore = ref(false)

        const getFilterRequestPath = (newQuery) => {
            if (newQuery) {
                return `${baseUrl}${newQuery}`
            }
            const pageQuery = route.query.page
                ? `?page=${route.query.page}`
                : ''
            return baseUrl + pageQuery
        }

        const { data, error, execute, pending, refresh, status } =
            await useAsyncData('filter-page', async () => {
                const [cocktailsFull, items] = await Promise.all([
                    $fetchWIXUP(getFilterRequestPath()),
                    $fetch(`https://newapi.mixdrinks.org/api${route.path}`),
                ])
                return { cocktailsFull, items }
            })

        async function getNewCoctails(newQuery) {
            return await $fetchWIXUP(getFilterRequestPath(newQuery))
        }
        const loadMore = (newQuery) => {
            isLoadMore.value = true
            getNewCoctails(newQuery).then((value) => {
                data.value.cocktailsFull.cocktails = [
                    ...unref(data).cocktailsFull.cocktails,
                    ...value.cocktails,
                ]
                isLoadMore.value = false
            })
        }
        watch(route, () => {
            if (!unref(isLoadMore)) {
                refresh()
                setTimeout(() => {
                    window.scrollTo({
                        top: 0,
                        left: 0,
                    })
                }, 0)
            }
        })

        return {
            data,
            loadMore,
        }
    },
})
</script>

<style lang="scss" scoped>
.wrapper {
    @include defaultWrapper;
}
</style>
