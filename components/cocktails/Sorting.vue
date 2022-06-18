<template>
  <div class="sorting">
    <div class="sorting__title">Сортування</div>
    <ul class="sorting__list">
      <li
        class="sorting__item"
        v-for="sortItem in sortWithUrl"
        :key="sortItem.id"
      >
        <NuxtLink
          class="sorting__link"
          :class="{ active: sortItem.active }"
          :to="sortItem.link"
          @click.native="updateCocktails()"
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
.sorting {
  &__title {
    @include fontSize16M;
  }
  &__list {
    display: flex;
  }
  &__item {
    &:not(:last-child) {
      margin-right: 8px;
    }
  }
  &__link {
    display: block;
    @include fontSize14;
    padding: 4px 4px;

    border-bottom: 1px solid transparent;
    color: $colorMain;

    transition: border-bottom-color $defaultAnimTime,
      background-color $defaultAnimTime, color $defaultAnimTime;
    &.active {
      color: $colorWhite;
      background-color: $colorMain;
      &:hover {
        background-color: $colorHover;
      }
    }
    &:not(.active) {
      &:hover {
        border-bottom-color: $colorMain;
      }
    }
  }
  @media (max-width: 1199px) {
    &__title {
      margin-bottom: 8px;
    }
  }
  @media (min-width: 1200px) {
    &__title {
      margin-right: $halfShortMargin;
    }
    display: flex;
    align-items: center;
  }
}
</style>
