<template>
    <div class="cocktails">
        <div ref="scrollEl" class="cocktails__header cocktails-header">
            <h1 class="cocktails-header__title">
                {{ pageTitle }}
            </h1>
            <CocktailsSorting class="cocktails-header__sorting" />
        </div>
        <div class="cocktails__body cocktails-body">
            <CocktailsFilters
                :filterList="allFilters"
                :allCocktailsNumber="cocktailsFull.totalCount"
                :futureCounts="cocktailsFull.futureCounts"
            />
            <CocktailsList
                :element="scrollEl" 
                :cocktails="cocktailsFull.cocktails"
            />
        </div>
        <Pagination
            v-if="cocktailsFull.totalCount > 24"
            @loadMore="loadMore"
            :totalItems="cocktailsFull.totalCount"
            :limit="24"
            class="cocktails__pagination"
        />
    </div>
</template>

<script>
import { onBeforeMount, defineComponent, computed, toRefs, ref, unref, watch } from 'vue'
import { useRoute } from 'nuxt/app'
import { store } from '~~/store/filter'
import { head } from '~~/utils/head'

import CocktailsList from './../global/CocktailsList.vue'
import CocktailsFilters from './CocktailsFilters.vue'
import Pagination from '../dump/Pagination.vue'
import CocktailsSorting from './CocktailsSorting.vue'
export default defineComponent({
    name: 'CocktailsPage',
    components: {
        CocktailsFilters,
        Pagination,
        CocktailsList,
        CocktailsSorting
    },
    props: {
        allFilters: {
            type: Array,
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
        const { allFilters, cocktailsFull } = toRefs(props)

        const loadMore = () => isLoadMore.value = true
        
        const scrollEl = ref(null)

        watch(route, () => {
            if(unref(isLoadMore)) {
                emit('loadMore')
                isLoadMore.value = false
            } else {
                emit('updateCoctails')
            }
        })

        const setOpenList = () => store.actions.setFiltersIsOpenList(unref(allFilters))

        onBeforeMount(() => setOpenList())

        const pageTitle = computed(() => unref(cocktailsFull).description ? unref(cocktailsFull).description : 'Коктейлі')

        const headTitle = unref(cocktailsFull).description
            ? `${unref(cocktailsFull).description} 🍹 та рецепти до них в домашніх умовах`
            : 'Колекція коктейлів 🍹 та рецептів до них в домашніх умовах'

        const headDescription = unref(cocktailsFull).description
            ? `${unref(cocktailsFull).description} 🍸 з фото та рецептами, оберий який подобаєтья тобі`
            : 'Коктейлі алкогольні 🍸 та безалкогольні 🍹 з фото та рецептами, оберий який подобаєтья тобі'

        head({
            title: headTitle,
            description: headDescription,
            indexPage: unref(cocktailsFull).isAddToIndex,
        })

        return {
            pageTitle,
            loadMore,
            scrollEl
        }
    }
})
</script>

<style lang="scss" scoped>
@import './styles/cocktails-page';
</style>
