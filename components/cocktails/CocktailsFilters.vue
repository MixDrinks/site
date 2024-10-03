<template>
    <div :class="filtersClasees" class="filters">
        <div class="filters__main">
            <div class="filters__header filters-header">
                <div class="filters-header__title filters-header-title">
                    Фільтри
                    <span class="filters-header-title__count">
                        {{ cocktailsCount }}
                    </span>
                </div>
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
            </div>
            <CocktailsTags
                v-show="activeFilter.length"
                :tags="activeFilter"
                class="filters__tags"
            />
            <div class="filters__wrapper filters-wrapper">
                <CocktailsFilter
                    v-for="filter in filters"
                    :key="filter.id"
                    :filter="filter"
                />
            </div>
        </div>
        <div @click="changeFilterIsOpen" class="filters__btn filters-btn">
            {{ btnText }}
            <span v-if="isShowBtnCount" class="filters-btn__count">
                {{ activeFilter.length }}
            </span>
        </div>
        <div @click="changeFilterIsOpen" class="filters__background" />
    </div>
</template>

<script>
import { computed, defineComponent, toRefs, unref } from 'vue'
import { useRoute } from 'nuxt/app'
import { store } from '~~/store/filter'
import { querySTR } from '~~/utils/querySTR'

import IconBtn from '../UI/IconBtn.vue'
import CocktailsFilter from './CocktailsFilter.vue'
import CocktailsTags from './CocktailsTags.vue'

export default defineComponent({
    name: 'CocktailsFilters',
    components: { IconBtn, CocktailsFilter, CocktailsTags },

    props: {
        filters: {
            type: Array,
            required: true
        },
        cocktailsCount: {
            type: Number,
            default: 0
        }
    },

    setup(props) {
        const route = useRoute()

        const { filters } = toRefs(props)

        const changeFilterIsOpen = () => store.actions.changeMainIsOpen()
        const clearFilterUrl = computed(() => `/${querySTR(route, true)}`)
        const { isFilterOpen } = toRefs(store.getters)
        const filtersClasees = computed(() => ({
            'filters--hidden': !unref(isFilterOpen)
        }))
        const btnText = computed(() =>
            unref(isFilterOpen) ? 'Застосувати' : 'Фільтр'
        )
        const isShowBtnCount = computed(
            () => unref(activeFilter).length && !unref(isFilterOpen)
        )
        const activeFilter = computed(() =>
            unref(filters)
                .map((el) => el.items)
                .flat()
                .filter((item) => item.isActive)
        )

        return {
            activeFilter,
            filtersClasees,
            clearFilterUrl,
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
