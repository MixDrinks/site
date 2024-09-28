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
import { getItems, getCoctails } from '~~/api/pages'
import { query } from '~~/utils/querySTR'

export default defineComponent({
    name: 'ToolsPage',
    components: {
        ItemsPage,
    },
    async setup() {
        const { $fetchWIXUP } = useNuxtApp()
        const route = useRoute()
        const isLoadMore = ref(false)

        const getPath = (isNextPage) =>
            `tools=${route.params.id}${query(route, isNextPage)}`

        const { data, refresh } = await useAsyncData(
            'filter-page',
            async () => {
                const [cocktailsFull, items] = await Promise.all([
                    getCoctails(getPath(), $fetchWIXUP),
                    getItems(route.path),
                ])
                return { cocktailsFull, items }
            }
        )

        async function loadMore() {
            isLoadMore.value = true
            const { cocktails } = await getCoctails(getPath(true), $fetchWIXUP)
            data.value.cocktailsFull.cocktails = [
                ...unref(data).cocktailsFull.cocktails,
                ...cocktails,
            ]
            isLoadMore.value = false
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
