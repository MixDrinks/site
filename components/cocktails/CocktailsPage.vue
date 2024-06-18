<template>
    <div class="cocktails">
        <div class="cocktails__header cocktails-header">
            <h1 class="cocktails-header__title">Коктейлі</h1>
            <Sorting
                class="cocktails-header__sorting"
                @updateCocktails="updateCocktails"
            />
        </div>
        <div class="cocktails__body cocktails-body">
            <FilterList
                class="cocktails-body__filter"
                @updateCocktails="updateCocktails"
                :filterList="allFilters"
                :totalCount="cocktailsFull.totalCount"
                :futureCounts="cocktailsFull.futureCounts"
            />
            <CocktailsList
                class="cocktails-body__list"
                :cocktails="cocktailsFull.cocktails"
            />
        </div>
        <Pagination
            v-if="cocktailsFull.totalCount > 24"
            class="cocktails__pagination"
            :totalItems="cocktailsFull.totalCount"
            :limit="24"
            :itemsCount="cocktailsFull.cocktails.length"
            @updateCocktails="updateCocktails"
        />
    </div>
</template>

<script>
import CocktailsList from '~~/components/dump/CocktailsList'
import FilterList from '~~/components/cocktails/FilterList'
import Pagination from '~~/components/dump/Pagination'
import Sorting from '~~/components/cocktails/Sorting'
export default {
    components: { FilterList, Pagination, CocktailsList, Sorting },
    name: 'CocktailsPage',
    props: {
        allFilters: {
            type: Array,
            required: true,
        },
        cocktailsFull: {
            type: Object,
            required: true,
        },
    },
    methods: {
        updateCocktails(payload) {
            this.$emit('updateCocktails', payload)
        },
    },
}
</script>

<style lang="scss" scoped>
@import './styles/cocktails-page';
</style>
