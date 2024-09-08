<template>
    <div class="filter">
        <div
            class="filter__header filter-header"
            @click="toggleList(filterItem.id)"
        >
            <div class="filter-header__title">{{ filterItem.name }}</div>
            <div
                class="filter-header__toggler"
                :class="{
                    'filter-header__toggler--close': filtersIsOpenList.includes(
                        filterItem.id
                    ),
                }"
            ></div>
        </div>
        <transition name="max-height">
            <div
                class="filter__wrapper"
                v-if="!filtersIsOpenList.includes(filterItem.id)"
            >
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
                            v-if="!!listItem.cocktailCount"
                            class="filter-list__item filter-list-item"
                            :class="getLinkClasses(listItem)"
                            :to="listItem.url + query"
                        >
                            <span
                                class="filter-list-item__radio"
                                v-if="filterItem.selectionType === types.single"
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
                                v-if="!listItem.active"
                            >
                                {{ listItem.cocktailCount }}
                            </span>
                        </NuxtLink>
                        <div
                            v-else
                            class="filter-list__item filter-list-item filter-list-item--lock"
                        >
                            <span
                                class="filter-list-item__radio"
                                v-if="filterItem.selectionType === types.single"
                            ></span>
                            <span
                                class="filter-list-item__checkbox"
                                v-else
                            ></span>
                            <div class="filter-list-item__name">
                                {{ listItem.name }}
                            </div>
                            <div class="filter-list-item__count">
                                {{ listItem.cocktailCount }}
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
import { mapGetters, mapActions } from 'vuex'
import { types } from '~~/utils/selectionType'
export default {
    name: 'FilterItem',
    data: () => ({
        isCloseFilter: [],
        searchValue: '',
    }),
    methods: {
        // toggleList(id) {
        //   this.updateFiltersIsOpenList(id);
        // },
        updateCocktails(payload) {
            this.$emit('updateCocktails', payload)
        },
        ...mapActions('filter', {
            toggleList: 'updateFiltersIsOpenList',
        }),
        getLinkClasses(item) {
            if (item.active) return 'filter-list-item--active'
        },
        getRel(value) {
            return value ? 'tag' : 'nofollow'
        },
    },
    computed: {
        ...mapGetters('filter', {
            filtersIsOpenList: 'getFiltersIsOpenList',
        }),
        types() {
            return types
        },
        filterItemSort() {
            let arr = [...this.filterItem.items]
            return arr.sort((a, b) =>
                a.cocktailCount > b.cocktailCount ? -1 : 1
            )
        },
        query() {
            let query = '?'
            for (let [key, value] of Object.entries(this.$nuxt.$route.query)) {
                if (key != 'page') {
                    query = query + `&${key}=${value}`
                }
            }
            return query
        },
        listSearch() {
            if (!!this.searchValue) {
                let arr = []
                arr = this.filterItemSort.filter((listItem) => {
                    return listItem.name
                        .toLowerCase()
                        .includes(this.searchValue.toLowerCase())
                })
                return arr
            } else {
                return this.filterItemSort
            }
        },
    },
    props: {
        filterItem: {
            type: Object,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped>
@import './styles/filter-item';
</style>
