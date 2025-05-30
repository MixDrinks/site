<template>
    <div class="filter">
        <div @click="toggleList" class="header">
            <div class="header__title">
                {{ filter.name }}
            </div>
            <button
                :class="togglerClasses"
                title="Відкрити фільтр"
                class="header__toggler"
            />
        </div>
        <div :style="{ height: height }" class="filter__wrapper">
            <div ref="animations" class="filter__animations">
                <CocktailsSearch
                    v-if="searchIsShow"
                    v-model:value="searchValue"
                    class="filter__search"
                />
                <div class="filter__list filter-list">
                    <template
                        v-for="item in listSearch"
                        :key="`filter-list__item-${item.name}`"
                    >
                        <div
                            :class="getLinkClasses(item)"
                            class="filter-list__item filter-list-item"
                        >
                            <span
                                :class="filterListItemClasses"
                                class="filter-list-item__flag"
                            />
                            <NuxtLink
                                v-if="!!item.count"
                                :title="item.name"
                                :rel="item.rel"
                                :to="item.url"
                                prefetchOn="interaction"
                                class="filter-list-item__name filter-list-item__name--link"
                            >
                                {{ item.name }}
                            </Nuxtlink>
                            <span v-else class="filter-list-item__name">
                                {{ item.name }}
                            </span>
                            <span
                                v-if="!item.isActive"
                                class="filter-list-item__count"
                            >
                                {{ item.count }}
                            </span>
                        </div>
                    </template>
                    <div v-if="listSearchIsEmpty" class="filter-list__text">
                        Нічого не знайдено
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { filterStore } from '~~/store/filter'
import {
    computed,
    defineComponent,
    toRefs,
    unref,
    ref,
    onUpdated,
    onMounted
} from 'vue'
import { filterType } from '~~/utils/selectionType'
import CocktailsSearch from './CocktailsSearch.vue'

export default defineComponent({
    name: 'CocktailsFilter',
    components: { CocktailsSearch },

    props: {
        filter: {
            type: Object,
            required: true
        }
    },

    setup(props) {
        const { filter } = toRefs(props)
        const { filtersIsOpenList, filtersListIsSet } = toRefs(
            filterStore.getters
        )

        const filterIsShow = computed(() => {
            if (unref(filtersListIsSet)) {
                return !unref(filtersIsOpenList).includes(unref(filter).id)
            }
            return unref(filter).isOpen
        })
        const toggleList = () => {
            filterStore.actions.updateFiltersIsOpenList(unref(filter).id)
        }

        const animations = ref('')
        const animationsHeight = ref(unref(animations).offsetHeight)
        const height = computed(() => {
            if (unref(filterIsShow)) {
                return `${unref(animationsHeight)}px`
            }
            return `0px`
        })
        const getLinkClasses = (item) => ({
            'filter-list-item--active': item.isActive,
            'filter-list-item--lock': !item.count
        })

        const searchValue = ref('')

        const listSearch = computed(() => {
            if (unref(searchValue)) {
                return unref(filter).items.filter((listItem) =>
                    listItem.name
                        .toLowerCase()
                        .includes(unref(searchValue).toLowerCase())
                )
            }
            return unref(filter).items
        })

        onMounted(
            () => (animationsHeight.value = unref(animations).offsetHeight)
        )
        onUpdated(
            () => (animationsHeight.value = unref(animations).offsetHeight)
        )

        const togglerClasses = computed(() => ({
            'header__toggler--close': unref(filterIsShow)
        }))
        const isSingleType = computed(
            () => unref(filter).selectionType === filterType.single
        )
        const searchIsShow = computed(() => unref(filter).items.length > 6)
        const listSearchIsEmpty = computed(() => unref(listSearch).length === 0)
        const filterListItemClasses = computed(() =>
            unref(isSingleType)
                ? 'filter-list-item__flag--radio'
                : 'filter-list-item__flag--checkbox'
        )

        return {
            getLinkClasses,
            toggleList,
            filterIsShow,
            listSearch,
            togglerClasses,
            searchIsShow,
            listSearchIsEmpty,
            filterListItemClasses,
            searchValue,
            animations,
            height
        }
    }
})
</script>

<style lang="scss" scoped>
@import './styles/cocktails-filter';
</style>
