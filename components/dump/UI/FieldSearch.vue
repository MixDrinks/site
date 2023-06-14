<template>
  <div class="search">
    <label
      class="search__header search-header"
      :class="{ 'search-header--filled': inputValue }"
    >
      <div class="search-header__label">Пошук коктейля</div>

      <input
        ref="searchInput"
        class="search-header__input"
        type="text"
        v-model="inputValue"
        @focus="focusInput = !focusInput"
        @blur="focusInput = !focusInput"
      />
    </label>
    <transition name="max-height">
      <div
        class="search__result search-result"
        v-if="focusInput && inputValue"
      >
        <ul class="search-result__list search-result-list">
          <li
            class="search-result-list__item search-result-list-item"
            v-for="listItem in filteredList"
            :key="listItem.id"
          >
            <NuxtLink
              :to="`/cocktails/${listItem.slug}`"
              class="search-result-list-item__link"
              @click.native="removeSearch"
            >
              {{ listItem.name }}
            </NuxtLink>
          </li>
          <li
            v-if="!!!filteredList.length && inputValue"
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
import { getCocktailsShort } from "~~/api";
export default {
  name: "FieldSearch",
  data: () => ({
    inputValue: "",
    listSearch: [],
    focusInput: false,
  }),

  async fetch() {
    this.listSearch = await getCocktailsShort().then((res) => res.data);
  },

  methods: {
    removeSearch() {
      this.$refs.searchInput.value = "";
      this.inputValue = "";
    },
  },
  computed: {
    filteredList() {
      let arr = [];
      if (!!this.inputValue) {
        arr = this.listSearch.filter((listItem) => {
          return listItem.name
            .toLowerCase()
            .includes(this.inputValue.toLowerCase());
        });
      }
      return arr;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./styles/field-search";
</style>
