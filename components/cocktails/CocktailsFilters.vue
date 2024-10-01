<template>
    <div 
        :class="filtersClasees"
        class="filters"
    >
        <div  class="filters__main">
            <div class="filters__header filters-header">
                <div class="filters-header__title filters-header-title">
                    Фільтри
                    <span class="filters-header-title__count">
                        {{ allCocktailsNumber }}
                    </span>
                </div>
                <transition appear name="fate-in">
                    <IconBtn
                        v-show="activeFilter.length"
                        @click="changeFilterIsOpen"
                        :href="clearFilterUrl"
                        class="filters-header__close"
                        type="short"
                        icon="/img/icons/trash.svg"
                    >
                        Відмінити всі фільтри 
                    </IconBtn>
                </transition>
            </div>
            <CocktailsTags 
                v-if="activeFilter.length"
                :tags="activeFilter"
                class="filters__tags"
            />
            <div class="filters__wrapper filters-wrapper">
                <CocktailsFilter
                    v-for="filterItem in filterListWithUrl"
                    :key="filterItem.id"
                    :filter="filterItem"
                    class="filters-wrapper__item"
                />
            </div>
        </div>
        <div 
            @click="changeFilterIsOpen"
            class="filters__btn filters-btn"
        >
            {{ btnText }}
            <span 
                v-if="isShowBtnCount" 
                class="filters-btn__count"
            >
                {{ activeFilter.length }}
            </span>
        </div>
        <div
            @click="changeFilterIsOpen"
            class="filters__background"
        />
    </div>
</template>

<script>
import { computed, defineComponent, toRefs, unref } from 'vue'
import { useRoute } from 'nuxt/app'
import { store } from '~~/store/filter'
import { query } from '~~/utils/querySTR'

import IconBtn from '../UI/IconBtn.vue'
import CocktailsFilter from './CocktailsFilter.vue'
import CocktailsTags from './CocktailsTags.vue'

export default defineComponent({
    name: 'CocktailsFilters',
    components: { IconBtn, CocktailsFilter, CocktailsTags },

    props: {
        filterList: {
            type: Array,
            required: true
        },
        futureCounts: {
            type: Object,
            required: true
        },
        allCocktailsNumber: {
            type: Number,
            default: 0
        },
    },

    setup(props) {
        const route = useRoute()
        const { filterList, futureCounts } = toRefs(props)
        const { isFilterOpen } = toRefs(store.getters)

        const clearFilterUrl =  computed(() => `/${query(route, true)}`)
        const filtersClasees = computed(() => ({ 'filters--hidden': !unref(isFilterOpen) }))
        
        const filterListWithUrl = computed(() => {
            const futureFilters = {}
            for (const filter in unref(futureCounts)) {
                futureFilters[filter] = {}
                unref(futureCounts)[filter].forEach((filterItem) => {
                    futureFilters[filter][filterItem.id] = filterItem
                })
            }
            return unref(filterList).map((filterItem) => ({
                ...filterItem,
                items: filterItem.items.map((item) => {
                    const newValue = futureFilters[filterItem.id][item.id]

                    return {
                        ...item,
                        url: `/${newValue.query}${query(route, true)}`,
                        count: newValue.count,
                        rel: getRel(newValue.isAddToIndex),
                        isActive: newValue.isActive,
                        isAddToIndex: newValue.isAddToIndex
                    }
                }).sort((a, b) => (a.count > b.count ? -1 : 1))
            }))
        })
        const activeFilter = computed(() => unref(filterListWithUrl).map((el) => el.items).flat().filter((item) => item.isActive))

        const getRel = (value) => (value ? 'tag' : 'nofollow')
        const changeFilterIsOpen = () => store.actions.changeMainIsOpen()

        const btnText = computed(() => unref(isFilterOpen) ? 'Застосувати' : 'Фільтр')
        const isShowBtnCount = computed(() => unref(activeFilter).length && !unref(isFilterOpen))

        return {
            activeFilter,
            filtersClasees,
            clearFilterUrl,
            filterListWithUrl,
            isFilterOpen,
            changeFilterIsOpen,
            btnText,
            isShowBtnCount
        }
    }
})
</script>

<style lang="scss" scoped>
@import './styles/cocktails-filters';
</style>
