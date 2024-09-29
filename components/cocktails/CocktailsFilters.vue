<template>
    <div class="filters">
        <div :class="mainClasees" class="filters__main">
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
                        :href="`${clearFilterUrl}`"
                        class="filters-header__close"
                        direction="top"
                        type="short"
                        icon="/img/icons/trash.svg"
                    >
                        Відмінити всі фільтри
                    </IconBtn>
                </transition>
            </div>
            <div class="filters__tag-cloud filters-tag-cloud">
                <div class="filters-tag-cloud__list filters-tag-cloud-list">
                    <div
                        v-for="filterItem in activeFilter"
                        :key="filterItem.name"
                        class="filters-tag-cloud-list__item filters-tag-cloud-list-item"
                    >
                        <NuxtLink
                            :title="filterItem.name"
                            :to="`/${filterItem.url}`"
                            :rel="getRel(filterItem.isAddToIndex)"
                            class="filters-tag-cloud-list-item__link"
                        >
                            {{ filterItem.name }}
                        </NuxtLink>
                    </div>
                </div>
            </div>
            <div class="filters__wrapper filters-wrapper">
                <CocktailsFilter
                    v-for="filterItem in filterListWithUrl"
                    :key="filterItem.id"
                    :filterItem="filterItem"
                    class="filters-wrapper__item"
                />
            </div>
        </div>
        <div @click="changeFilterIsOpen" class="filters__btn filters-btn">
            <template v-if="isFilterOpen">
                <span class="filters-btn__text">Застосувати</span>
            </template>
            <template v-else>
                <span class="filters-btn__text">Фільтр</span>
                <span v-if="activeFilter.length" class="filters-btn__count">
                    {{ activeFilter.length }}
                </span>
            </template>
        </div>
        <transition name="opacity">
            <div
                v-if="isFilterOpen"
                @click="changeFilterIsOpen"
                class="filters__background"
            />
        </transition>
    </div>
</template>

<script>
import { computed, defineComponent, toRefs, unref } from 'vue'
import { useRoute } from 'nuxt/app'
import IconBtn from '../UI/IconBtn.vue'
import CocktailsFilter from './CocktailsFilter.vue'
import { store } from '~~/store/filter'

export default defineComponent({
    name: 'CocktailsFilters',
    components: { IconBtn, CocktailsFilter },

    props: {
        filterList: {
            type: Array,
            required: true
        },
        allCocktailsNumber: {
            type: Number,
            default: 0
        },
        futureCounts: {
            type: Object,
            required: true
        }
    },

    setup(props) {
        const route = useRoute()
        const { filterList, futureCounts } = toRefs(props)
        const { isFilterOpen } = toRefs(store.getters)

        const clearFilterUrl = computed(() => {
            if (route.query.sort) {
                return `/?sort=${route.query.sort}`
            }
            return '/'
        })
        const activeFilter = computed(() => {
            const arr = unref(filterListWithUrl)
                .map((el) => el.items)
                .flat()
            return arr.filter((item) => item.isActive)
        })
        const mainClasees = computed(() => {
            return { 'filters__main--hidden': !unref(isFilterOpen) }
        })
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
                    const value = newValue
                        ? {
                              ...item,
                              url: newValue.query,
                              count: newValue.count,
                              isActive: newValue.isActive,
                              isAddToIndex: newValue.isAddToIndex
                          }
                        : { ...item }
                    return value
                })
            }))
        })

        const getRel = (value) => (value ? 'tag' : 'nofollow')
        const changeFilterIsOpen = () => {
            store.actions.changeMainIsOpen()
        }

        return {
            getRel,
            activeFilter,
            mainClasees,
            clearFilterUrl,
            filterListWithUrl,
            isFilterOpen,
            changeFilterIsOpen,
            store
        }
    }
})
</script>

<style lang="scss" scoped>
@import './styles/cocktails-filters';
</style>
