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
export default {
    name: 'FieldSearch',
    data: () => ({
        inputValue: '',
        listSearch: [],
        focusInput: false,
    }),

    methods: {
        async setListSearch() {
            this.listSearch = await this.$axios
                .get(`/cocktails/all`)
                .then((res) => res.data)
        },
        setFocus() {
            this.inputValue = ''
            this.focusInput = true
            if (!!!this.listSearch.length) this.setListSearch()
        },
        removeFocus() {
            this.focusInput = false
        },
    },
    computed: {
        filteredList() {
            if (!!this.inputValue) {
                return this.listSearch.filter((listItem) => {
                    return listItem.name
                        .toLowerCase()
                        .includes(this.inputValue.toLowerCase())
                })
            }
            return []
        },
        searchClasses() {
            return { 'search-header--filled': this.focusInput }
        },
    },
}
</script>

<style lang="scss" scoped>
@import './styles/field-search';
</style>
