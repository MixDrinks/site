<template>
    <div class="filters">
        <div class="filters__main" :class="mainClasees">
            <div class="filters__header filters-header">
                <div class="filters-header__title filters-header-title">
                    Фільтри
                    <span class="filters-header-title__count">
                        {{ totalCount }}
                    </span>
                </div>
                <transition name="fate-in" appear>
                    <IconBtn
                        class="filters-header__close"
                        v-show="activeFilter.length"
                        direction="top"
                        type="short"
                        icon="/img/icons/trash.svg"
                        :href="`${clearFilterUrl}`"
                    >
                        Відмінити всі фільтри
                    </IconBtn>
                </transition>
            </div>
            <div class="filters__tag-cloud filters-tag-cloud">
                <div class="filters-tag-cloud__list filters-tag-cloud-list">
                    <!-- <transition-group
                        class="filters-tag-cloud__list filters-tag-cloud-list"
                        name="fate-in"
                        mode="page"
                        appear
                    > -->
                    <div
                        class="filters-tag-cloud-list__item filters-tag-cloud-list-item"
                        v-for="filterItem in activeFilter"
                        :key="filterItem.name"
                    >
                        <NuxtLink
                            :title="filterItem.name"
                            class="filters-tag-cloud-list-item__link"
                            :to="`/${filterItem.url}`"
                            :rel="getRel(filterItem.isAddToIndex)"
                        >
                            {{ filterItem.name }}
                        </NuxtLink>
                    </div>
                    <!-- </transition-group> -->
                </div>
            </div>
            <div class="filters__wrapper filters-wrapper">
                <FilterItem
                    class="filters-wrapper__item"
                    v-for="filterItem in filterListWithUrl"
                    :key="filterItem.id"
                    :filterItem="filterItem"
                />
            </div>
        </div>
        <div class="filters__btn filters-btn" @click="changeFilterIsOpen">
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
                class="filters__background"
                v-if="isFilterOpen"
                @click="changeFilterIsOpen"
            ></div>
        </transition>
    </div>
</template>

<script>
import { computed, defineComponent, toRefs, unref } from 'vue'
import { useRoute } from 'nuxt/app'
import IconBtn from './../UI/IconBtn.vue'
import FilterItem from './FilterItem.vue'
import { store } from '~~/store/filter'

export default defineComponent({
    components: { IconBtn, FilterItem },
    name: 'FilterList',

    props: {
        filterList: {
            type: Array,
            required: true,
        },
        totalCount: {
            type: Number,
            default: 0,
        },
        futureCounts: {
            type: Object,
            required: true,
        },
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
            let futureFilters = {}
            for (let filter in unref(futureCounts)) {
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
                              isAddToIndex: newValue.isAddToIndex,
                          }
                        : { ...item }
                    return value
                }),
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
            store,
        }
    },
})
</script>

<style lang="scss" scoped>
@import './styles/filter-list';
</style>
