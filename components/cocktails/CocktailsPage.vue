<template>
    <div class="cocktails">
        <div class="cocktails__header cocktails-header">
            <h1 class="cocktails-header__title">
                {{ pageTitle }}
            </h1>
            <CocktailsSorting class="cocktails-header__sorting" />
        </div>
        <div class="cocktails__body cocktails-body">
            <CocktailsFilters
                :filters="filters"
                :cocktailsCount="info.cocktailsCount"
            />
            <CocktailsList :element="scrollEl" :cocktails="cocktails" />
        </div>
        <Pagination
            v-if="info.cocktailsCount > 24"
            @loadMore="loadMore"
            :totalItems="info.cocktailsCount"
            :limit="24"
            class="cocktails__pagination"
        />
    </div>
</template>

<script>
import { defineComponent, computed, toRefs, ref, unref } from 'vue'
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
        filters: {
            type: Array,
            required: true
        },
        cocktails: {
            type: Object,
            required: true
        },
        info: {
            type: Object,
            required: true
        }
    },
    emits: ['loadMore'],
    setup(props, { emit }) {
        const { info } = toRefs(props)
        const scrollEl = ref(null)
        const pageTitle = computed(() =>
            unref(info).title ? unref(info).title : 'Коктейлі'
        )

        const loadMore = () => emit('loadMore')

        const headTitle = unref(info).title
            ? `${unref(info).title} 🍹 та рецепти до них в домашніх умовах`
            : 'Колекція коктейлів 🍹 та рецептів до них в домашніх умовах'

        const headDescription = unref(info).title
            ? `${unref(info).title} 🍸 з фото та рецептами, оберий який подобаєтья тобі`
            : 'Коктейлі алкогольні 🍸 та безалкогольні 🍹 з фото та рецептами, оберий який подобаєтья тобі'

        head({
            title: headTitle,
            description: headDescription,
            indexPage: unref(info).isIndex
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
