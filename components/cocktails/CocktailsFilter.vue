<template>
    <div class="filter">
        <div class="filter__header filter-header" @click="toggleList">
            <div class="filter-header__title">{{ filterItem.name }}</div>
            <div class="filter-header__toggler" :class="togglerClasses"></div>
        </div>
        <transition name="max-height">
            <div class="filter__wrapper" v-show="filterIsShow">
                <div
                    class="filter__search filter-search"
                    v-if="filterItem.items.length > 6"
                >
                    <label
                        class="filter-search__input filter-search-input"
                        :class="{
                            'filter-search-input--filled': !!searchValue,
                        }"
                    >
                        <div class="filter-search-input__label">Пошук</div>
                        <input
                            ref="searchInput"
                            class="filter-search-input__value"
                            type="text"
                            v-model="searchValue"
                        />
                    </label>
                </div>
                <div class="filter__list filter-list">
                    <div v-for="listItem in listSearch" :key="listItem.id">
                        <NuxtLink
                            :title="listItem.name"
                            :rel="getRel(listItem.isAddToIndex)"
                            v-if="!!listItem.count"
                            class="filter-list__item filter-list-item"
                            :class="getLinkClasses(listItem.isActive)"
                            :to="`/${listItem.url + query}`"
                        >
                            <span
                                class="filter-list-item__radio"
                                v-if="
                                    filterItem.selectionType ===
                                    filterType.single
                                "
                            ></span>
                            <span
                                class="filter-list-item__checkbox"
                                v-else
                            ></span>
                            <span class="filter-list-item__name">
                                {{ listItem.selectionType }}
                                {{ listItem.name }}
                            </span>
                            <span
                                class="filter-list-item__count"
                                v-if="!listItem.isActive"
                            >
                                {{ listItem.count }}
                            </span>
                        </NuxtLink>
                        <div
                            v-else
                            class="filter-list__item filter-list-item filter-list-item--lock"
                        >
                            <span
                                class="filter-list-item__radio"
                                v-if="
                                    filterItem.selectionType ===
                                    filterType.single
                                "
                            ></span>
                            <span
                                class="filter-list-item__checkbox"
                                v-else
                            ></span>
                            <div class="filter-list-item__name">
                                {{ listItem.name }}
                            </div>
                            <div class="filter-list-item__count">
                                {{ listItem.count }}
                            </div>
                        </div>
                    </div>
                    <div
                        class="filter-list__text"
                        v-if="listSearch.length === 0"
                    >
                        нічого не знайдено
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { useRoute } from 'nuxt/app'
import { store } from '~~/store/filter'
import { computed, defineComponent, toRefs, unref, ref } from 'vue'
import { filterType } from '~~/utils/selectionType'

export default defineComponent({
    name: 'CocktailsFilter',

    props: {
        filterItem: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const route = useRoute()
        const { filterItem } = toRefs(props)
        const searchValue = ref('')
        const { filtersIsOpenList, filtersListIsSet } = toRefs(store.getters)

        const query = computed(() => {
            if (route.query.sort) {
                return `?sort=${route.query.sort}`
            }
            return ''
        })
        const filterItemSort = computed(() => {
            let arr = [...unref(filterItem).items]
            return arr.sort((a, b) => (a.count > b.count ? -1 : 1))
        })
        const filterIsShow = computed(() => {
            if (unref(filtersListIsSet)) {
                return !unref(filtersIsOpenList).includes(unref(filterItem).id)
            }
            return unref(filterItem).isOpen
        })
        const listSearch = computed(() => {
            if (!!unref(searchValue)) {
                let arr = []
                arr = unref(filterItemSort).filter((listItem) => {
                    return listItem.name
                        .toLowerCase()
                        .includes(unref(searchValue).toLowerCase())
                })
                return arr
            }
            return unref(filterItemSort)
        })
        const togglerClasses = computed(() => {
            if (unref(filtersListIsSet)) {
                return {
                    'filter-header__toggler--close': !unref(
                        filtersIsOpenList
                    ).includes(unref(filterItem).id),
                }
            }
            return {
                'filter-header__toggler--close': unref(filterItem).isOpen,
            }
        })
        const toggleList = () => {
            store.actions.updateFiltersIsOpenList(unref(filterItem).id)
        }
        const getLinkClasses = (value) => ({
            'filter-list-item--active': value,
        })
        const getRel = (value) => (value ? 'tag' : 'nofollow')

        return {
            getLinkClasses,
            getRel,
            searchValue,
            toggleList,
            filterIsShow,
            listSearch,
            query,
            togglerClasses,
            filterType,
        }
    },
})
</script>

<style lang="scss" scoped>
@import './styles/cocktails-filter';
</style>
