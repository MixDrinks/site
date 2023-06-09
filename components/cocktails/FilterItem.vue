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
          'filter-header__toggler--close': isCloseFilter.includes(
            filterItem.id
          ),
        }"
      ></div>
    </div>
    <transition name="max-height">
      <div
        class="filter__wrapper"
        v-if="!isCloseFilter.includes(filterItem.id)"
      >
        <div
          class="filter__search filter-search"
          v-if="filterItem.items.length > 6"
        >
          <label
            class="filter-search__input filter-search-input"
            :class="{ 'filter-search-input--filled': !!searchValue }"
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
          <div
            v-for="filterItem in listSearch"
            :key="filterItem.id"
          >
            <NuxtLink
              :title="filterItem.name"
              rel="tag"
              v-if="!!filterItem.cocktailCount"
              class="filter-list__item filter-list-item"
              :class="{ 'filter-list-item--active': filterItem.active }"
              :to="filterItem.url"
            >
              <div class="filter-list-item__checkbox"></div>
              <div class="filter-list-item__name">
                {{ filterItem.name }}
              </div>
              <div
                class="filter-list-item__count"
                v-if="!filterItem.active"
              >
                {{ filterItem.cocktailCount }}
              </div>
            </NuxtLink>
            <div
              v-else
              class="filter-list__item filter-list-item filter-list-item--lock"
            >
              <div class="filter-list-item__checkbox"></div>
              <div class="filter-list-item__name">
                {{ filterItem.name }}
              </div>
              <div class="filter-list-item__count">
                {{ filterItem.cocktailCount }}
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
export default {
  name: "FilterItem",
  data: () => ({
    isCloseFilter: [],
    searchValue: "",
  }),
  methods: {
    toggleList(id) {
      if (this.isCloseFilter.includes(id)) {
        this.isCloseFilter = this.isCloseFilter.filter((el) => el != id);
      } else {
        this.isCloseFilter.push(id);
      }
    },
    updateCocktails(payload) {
      this.$emit("updateCocktails", payload);
    },
  },
  computed: {
    filterItemSort() {
      let arr = [...this.filterItem.items];
      return arr.sort((a, b) => (a.cocktailCount > b.cocktailCount ? -1 : 1));
    },
    listSearch() {
      if (!!this.searchValue) {
        let arr = [];
        arr = this.filterItemSort.filter((listItem) => {
          return listItem.name
            .toLowerCase()
            .includes(this.searchValue.toLowerCase());
        });
        return arr;
      } else {
        return this.filterItemSort;
      }
    },
  },
  props: {
    filterItem: {
      type: Object,
      require: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./styles/filter-item";
</style>
