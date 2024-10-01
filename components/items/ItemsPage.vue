<template>
    <div class="items">
        <h1 class="items__title" itemprop="name">
            {{ items.name }}
        </h1>
        <div class="items__main items-main">
            <picture class="items-main__picture">
                <source
                    v-for="img in items.images"
                    :key="img.id"
                    :srcset="img.srcset"
                    :media="img.media"
                    :type="img.type"
                />
                <img
                    :alt="`Зображення ${items.name}`"
                    class="items-main__img"
                    width="500"
                    height="500"
                    title=""
                />
            </picture>
            <div class="items-main__about items-main-about">
                <TitleH2
                    :text="`Опис ${items.name}`"
                    class="items-main-about__title"
                />
                <p class="items-main-about__text">{{ items.about }}</p>
            </div>
        </div>
        <div ref="scrollEl" />
        <Separator />
        <div class="items__cocktails items-cocktails">
            <TitleH2
                :text="`Коктейлі з використанням ${items.name}`"
                class="items-cocktails__title"
            />
            <CocktailsList
                :element="scrollEl"
                :cocktails="cocktailsFull.cocktails"
                modificator="items"
            />
        </div>
        <Pagination
            v-if="cocktailsFull.totalCount > 24"
            @loadMore="loadMore"
            :totalItems="cocktailsFull.totalCount"
            :limit="24"
            class="items__pagination"
        />
    </div>
</template>

<script>
import { toRefs, defineComponent, unref, ref, watch } from 'vue'
import { useRoute } from 'nuxt/app'
import { head } from '~~/utils/head'

import Separator from '../global/Separator.vue'
import CocktailsList from '../global/CocktailsList.vue'
import TitleH2 from '../global/TitleH2.vue'
import Pagination from '../dump/Pagination.vue'

export default defineComponent({
    name: 'ItemsPage',
    components: { Pagination, CocktailsList, TitleH2, Separator },

    props: {
        items: {
            type: Object,
            required: true
        },
        cocktailsFull: {
            type: Object,
            required: true
        }
    },
    emits: ['loadMore', 'updateCoctails'],
    setup(props, { emit }) {
        const route = useRoute()
        const isLoadMore = ref(false)
        const { items, cocktailsFull } = toRefs(props)

        const loadMore = () => (isLoadMore.value = true)

        const scrollEl = ref(null)

        watch(route, () => {
            if (unref(isLoadMore)) {
                emit('loadMore')
                isLoadMore.value = false
            } else {
                emit('updateCoctails')
            }
        })

        const headTitle = `Дізнайся в яких коктейлях 🍸 використовується ${unref(items).name}`
        const headDescription = `${unref(items).name} використовується в представлених коктейлях 🍸 наведені рецепти та фото`

        head({
            title: headTitle,
            description: headDescription,
            indexPage: unref(cocktailsFull).isAddToIndex,
            image: unref(items).meta.ogImage
        })

        return {
            loadMore,
            scrollEl
        }
    }
})
</script>

<style lang="scss" scoped>
@import './styles/items-page';
</style>
