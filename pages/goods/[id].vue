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
import { getItems, getCoctails } from '~~/api/pages'
import { querySTR } from '~~/utils/querySTR'

import ItemsPage from '~~/components/items/ItemsPage.vue'

export default defineComponent({
    name: 'GoodsPage',
    components: {
        ItemsPage
    },
    async setup() {
        const { $fetchWIXUP } = useNuxtApp()
        const route = useRoute()

        const getPath = () => `/goods=${route.params.id}${querySTR(route)}`

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
