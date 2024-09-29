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
                class="cocktails-body__filter"
                :filterList="allFilters"
                :allCocktailsNumber="cocktailsFull.totalCount"
                :futureCounts="cocktailsFull.futureCounts"
            />
            <div class="cocktails-body__wrapper">
                <CocktailsList
                    class="cocktails-body__list"
                    isFirstList
                    :cocktails="cocktailsFirst"
                />
                <div class="cocktails-body__ads">
                    <ins
                        class="adsbygoogle"
                        style="display: block"
                        data-ad-format="fluid"
                        data-ad-layout-key="-gh-4+1q-51+45"
                        data-ad-client="ca-pub-9033785625371866"
                        data-ad-slot="2682031593"
                    ></ins>
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
            @loadMore="loadMore"
        />
    </div>
</template>

<script>
import CocktailsList from './../global/CocktailsList.vue'
import CocktailsFilters from './CocktailsFilters.vue'
import Pagination from '../dump/Pagination.vue'
import CocktailsSorting from './CocktailsSorting.vue'
import { onBeforeMount, defineComponent, computed, toRefs, unref } from 'vue'
import { store } from '~~/store/filter'
import { head } from '~~/utils/head'
export default defineComponent({
    name: 'CocktailsPage',
    components: {
        CocktailsFilters,
        Pagination,
        CocktailsList,
        CocktailsSorting,
    },

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
    setup(props, { emit }) {
        const { allFilters, cocktailsFull } = toRefs(props)

        const checkLength = computed(
            () => unref(cocktailsFull).cocktails.length > 12
        )
        const cocktailsFirst = computed(() =>
            unref(checkLength)
                ? unref(cocktailsFull).cocktails.slice(0, 12)
                : unref(cocktailsFull).cocktails
        )
        const cocktailsSecond = computed(() =>
            unref(checkLength) ? unref(cocktailsFull).cocktails.slice(12) : []
        )

        const setOpenList = () =>
            store.actions.setFiltersIsOpenList(unref(allFilters))

        onBeforeMount(() => {
            setOpenList()
        })

        const pageTitle = computed(() =>
            unref(cocktailsFull).description
                ? unref(cocktailsFull).description
                : 'Коктейлі'
        )

        const scripts = [
            {
                async: true,
                src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9033785625371866',
                crossorigin: 'anonymous',
            },
            {
                innerHTML: `;(adsbygoogle = window.adsbygoogle || []).push({})`,
            },
        ]

        const headTitle = unref(cocktailsFull).description
            ? `${
                  unref(cocktailsFull).description
              } 🍹 та рецепти до них в домашніх умовах`
            : 'Колекція коктейлів 🍹 та рецептів до них в домашніх умовах'

        const headDescription = unref(cocktailsFull).description
            ? `${
                  unref(cocktailsFull).description
              } 🍸 з фото та рецептами, оберий який подобаєтья тобі`
            : 'Коктейлі алкогольні 🍸 та безалкогольні 🍹 з фото та рецептами, оберий який подобаєтья тобі'

        head({
            title: headTitle,
            description: headDescription,
            indexPage: unref(cocktailsFull).isAddToIndex,
            scripts: scripts,
        })

        const loadMore = (newQuery) => {
            emit('loadMore', newQuery)
        }

        return {
            cocktailsFirst,
            cocktailsSecond,
            checkLength,
            pageTitle,
            loadMore,
        }
    },
})
</script>

<style lang="scss" scoped>
@import './styles/cocktails-page';
</style>
