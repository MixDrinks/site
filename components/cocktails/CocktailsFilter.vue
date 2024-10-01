<template>
    <div class="filter">
        <div 
            @click="toggleList"
            class="header"
        >
            <div class="header__title">
                {{ filter.name }}
            </div>
            <button  
                :class="togglerClasses" 
                title="Відкрити фільтр"  
                class="header__toggler" 
            />
        </div>
        <transition name="max-height">
            <div 
                v-show="filterIsShow" 
                class="filter__wrapper"
            >   
                <CocktailsSearch 
                    v-if="searchIsShow" 
                    v-model:value="searchValue" 
                    class="filter__search" 
                />
                <div class="filter__list filter-list">
                    <template 
                        v-for="(item, itemIndex) in listSearch" 
                        :key="`filter-list__item-${itemIndex}`"
                    >
                        <NuxtLink
                            v-if="!!item.count"
                            :title="item.name"
                            :rel="item.rel"
                            :to="item.url"
                            :class="getLinkClasses(item.isActive)"
                            class="filter-list__item filter-list-item"
                        >
                            <span 
                                :class="filterListItemClasses" 
                                class="filter-list-item__flag"
                             />
                            <span class="filter-list-item__name">
                                {{ item.name }}
                            </span>
                            <span
                                v-if="!item.isActive"
                                class="filter-list-item__count"
                            >
                                {{ item.count }}
                            </span>
                        </NuxtLink>
                        <span
                            v-else
                            class="filter-list__item filter-list-item filter-list-item--lock"
                        >
                            <span 
                                :class="filterListItemClasses" 
                                class="filter-list-item__flag"
                             />
                            <span class="filter-list-item__name">
                                {{ item.name }}
                            </span>
                            <span class="filter-list-item__count">
                                {{ item.count }}
                            </span>
                        </span>
                    </template>
                    <div
                        v-if="listSearchIsEmpty"
                        class="filter-list__text"
                    >
                        Нічого не знайдено
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { store } from '~~/store/filter'
import { computed, defineComponent, toRefs, unref, ref } from 'vue'
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
        const { filtersIsOpenList, filtersListIsSet } = toRefs(store.getters)

        const filterIsShow = computed(() => {
            if (unref(filtersListIsSet)) {
                return !unref(filtersIsOpenList).includes(unref(filter).id)
            }
            return unref(filter).isOpen
        })

        const toggleList = () => store.actions.updateFiltersIsOpenList(unref(filter).id)
        const getLinkClasses = (value) => ({'filter-list-item--active': value})

        const searchValue = ref('')
        const listSearch = computed(() => {
            if (unref(searchValue)) {
                unref(filter).items.filter((listItem) => listItem.name.toLowerCase().includes(unref(searchValue).toLowerCase()))
            }
            return unref(filter).items
        })
        
        const togglerClasses = computed(() => ({'header__toggler--close': unref(filterIsShow)}))
        const isSingleType = computed(() => unref(filter).selectionType === filterType.single)
        const searchIsShow = computed(() => unref(filter).items.length > 6)
        const listSearchIsEmpty = computed(() => unref(listSearch).length === 0)
        const filterListItemClasses = computed(() => unref(isSingleType) 
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
        }
    }
})
</script>

<style lang="scss" scoped>
@import './styles/cocktails-filter';
</style>
