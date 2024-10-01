<template>
    <main class="wrapper">
        <ItemsPage
            @loadMore="loadMore"
            @updateCoctails="refresh"
            :cocktailsFull="data.cocktailsFull"
            :items="data.items"
        />
    </main>
</template>

<script>
import { defineComponent, unref } from 'vue'
import { useAsyncData, useNuxtApp, useRoute } from 'nuxt/app'

import ItemsPage from '~~/components/items/ItemsPage.vue'
import { getItems, getCoctails } from '~~/api/pages'
import { query } from '~~/utils/querySTR'

export default defineComponent({
    name: 'ToolsPage',
    components: {
        ItemsPage
    },
    async setup() {
        const { $fetchWIXUP } = useNuxtApp()
        const route = useRoute()

        const getPath = () => `/tools=${route.params.id}${query(route)}`

        const { data, refresh } = await useAsyncData(async () => {
            const [cocktailsFull, items] = await Promise.all([
                getCoctails(getPath(), $fetchWIXUP),
                getItems(route.path)
            ])
            return { cocktailsFull, items }
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
