<template>
    <div class="cocktails">
        <div class="cocktails__header cocktails-header">
            <h1 class="cocktails-header__title">
                {{ title }}
            </h1>
            <Sorting
                class="cocktails-header__sorting"
                @updatePage="updatePage"
            />
        </div>
        <div class="cocktails__body cocktails-body">
            <FilterList
                class="cocktails-body__filter"
                @updatePage="updatePage"
                :filterList="allFilters"
                :totalCount="cocktailsFull.totalCount"
                :futureCounts="cocktailsFull.futureCounts"
            />
            <div class="cocktails-body__wrapper">
                <CocktailsList
                    class="cocktails-body__list"
                    :cocktails="cocktailsFirst"
                />
                <div class="cocktails-body__ads">
                    <script
                        async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9033785625371866"
                        crossorigin="anonymous"
                    ></script>
                    <ins
                        class="adsbygoogle"
                        style="display: block"
                        data-ad-format="fluid"
                        data-ad-layout-key="-gh-4+1q-51+45"
                        data-ad-client="ca-pub-9033785625371866"
                        data-ad-slot="2682031593"
                    ></ins>
                    <script>
                        ;(adsbygoogle = window.adsbygoogle || []).push({})
                    </script>
                </div>
                <CocktailsList
                    v-if="checkLength"
                    class="cocktails-body__list"
                    :cocktails="cocktailsSecond"
                />
            </div>
        </div>
        <Pagination
            v-if="cocktailsFull.totalCount > 24"
            class="cocktails__pagination"
            :totalItems="cocktailsFull.totalCount"
            :limit="24"
            :itemsCount="cocktailsFull.cocktails.length"
            @updatePage="updatePage"
        />
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import CocktailsList from './CocktailsList.vue'
import FilterList from './FilterList.vue'
import Pagination from '../dump/Pagination.vue'
import Sorting from './Sorting.vue'
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
        updatePage(payload) {
            this.$emit('updatePage', payload)
        },
        ...mapActions('filter', {
            setOpenList: 'setFiltersIsOpenList',
        }),
    },
    computed: {
        title() {
            return this.cocktailsFull.description
                ? this.cocktailsFull.description
                : 'Коктейлі'
        },
        checkLength() {
            return this.cocktailsFull.cocktails.length > 12
        },
        cocktailsFirst() {
            return this.checkLength
                ? this.cocktailsFull.cocktails.slice(0, 12)
                : this.cocktailsFull.cocktails
        },
        cocktailsSecond() {
            return this.checkLength
                ? this.cocktailsFull.cocktails.slice(12)
                : []
        },
    },
    beforeMount() {
        this.setOpenList(this.allFilters)
    },
}
</script>

<style lang="scss" scoped>
@import './styles/cocktails-page';
</style>
