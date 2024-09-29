<template>
    <div class="search">
        <label :class="searchClasses" class="search__header search-header">
            <div class="search-header__label">Пошук коктейля</div>

            <input
                ref="searchInput"
                class="search-header__input"
                type="text"
                v-model="inputValue"
                @focus="setFocus()"
                @blur="removeFocus()"
            />
        </label>
        <transition name="max-height">
            <div
                class="search__result search-result"
                v-show="!!inputValue && focusInput"
            >
                <ul class="search-result__list search-result-list">
                    <li
                        class="search-result-list__item search-result-list-item"
                        v-for="(listItem, itemIndex) in filteredList"
                        :key="`search-result-list__item-${itemIndex}`"
                    >
                        <NuxtLink
                            :to="`/cocktails/${listItem.slug}`"
                            class="search-result-list-item__link"
                        >
                            {{ listItem.name }}
                        </NuxtLink>
                    </li>
                    <li
                        v-if="!!!filteredList.length && !!inputValue"
                        class="search-result-list__item search-result-list-item"
                    >
                        <span class="search-result-list-item__span">
                            Нічого не знайдено
                        </span>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
import { computed, defineComponent, ref, unref } from 'vue'

export default defineComponent({
    name: 'Search',

    setup() {
        const inputValue = ref('')
        const listSearch = ref([])
        const focusInput = ref(false)

        const removeFocus = () => (focusInput.value = false)

        async function setListSearch() {
            listSearch.value = await $fetch(
                `https://newapi.mixdrinks.org/api/cocktails/all`
            )
        }

        const setFocus = () => {
            inputValue.value = ''
            focusInput.value = true
            if (!!!unref(listSearch).length) setListSearch()
        }

        const searchClasses = computed(() => ({
            'search-header--filled': unref(focusInput),
        }))
        const filteredList = computed(() => {
            if (!!unref(inputValue)) {
                return unref(listSearch).filter((listItem) => {
                    return listItem.name
                        .toLowerCase()
                        .includes(unref(inputValue).toLowerCase())
                })
            }
            return []
        })
        return {
            inputValue,
            listSearch,
            focusInput,
            removeFocus,
            setFocus,
            searchClasses,
            filteredList,
        }
    },
})
</script>

<style lang="scss" scoped>
@import './styles/search';
</style>
