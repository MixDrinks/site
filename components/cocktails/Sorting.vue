<template>
  <div class="sorting">
    <div class="sorting__title">Сортування</div>
    <ul class="sorting__list sorting-list">
      <li
        class="sorting-list__item sorting-list-item"
        @click="updateCocktails()"
        v-for="sortItem in sortWithUrl"
        :data-cy="`sorting ${sortItem.id}`"
        :key="sortItem.id"
      >
        <NuxtLink
          class="sorting-list-item__link"
          :class="{ 'sorting-list-item__link--active': sortItem.active }"
          :to="sortItem.link"
        >
          {{ sortItem.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
import { sort } from "~~/utils/sort.js";
export default {
  name: "Sorting",
  methods: {
    updateCocktails(payload) {
      this.$emit("updateCocktails", payload);
    },
  },
  computed: {
    sort() {
      return sort;
    },
    sortWithUrl() {
      let arr = [...this.sort];
      arr.forEach((el) => {
        if (this.$nuxt.$route.query.sort != el.value) {
          el.link = `?sort=${el.value}${this.query}`;
          el.active = false;
        } else {
          el.link = `?${this.query}`;
          el.active = true;
        }
      });
      return arr;
    },
    currentPage() {
      return this.$nuxt.$route.path;
    },
    query() {
      let temp = "";
      for (let [key, value] of Object.entries(this.$nuxt.$route.query)) {
        if (key != "page" && key != "sort") {
          temp = temp + `&${key}=${value}`;
        }
      }
      return temp;
    },
  },
};
</script>

<style lang="scss" scoped>
@import './styles/sorting'
</style>
