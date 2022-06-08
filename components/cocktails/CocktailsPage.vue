<template>
  <div class="сocktails">
    <div class="сocktails__header">
      <SearchField :list="cocktails" />
    </div>

    <div class="сocktails__body">
      <FilterList
        class="сocktails__filter"
        @updateCocktails="updateCocktails"
        :filterList="tags"
      />
      <div class="сocktails__list">
        <CocktailsList :cocktails="cocktailsFull.cocktails" />
      </div>
    </div>
    <div class="сocktails__footer">
      <!-- <Pagination
        class="сocktails__pagination"
        :totalItems="cocktailsFull.totalCount"
        :limit="10"
        :itemsCount="cocktails.length"
        @updateCocktails="updateCocktails"
      /> -->
    </div>
  </div>
</template>

<script>
import CocktailsList from "~~/components/dump/CocktailsList.vue";
import SearchField from "~~/components/dump/UI/SearchField.vue";
import FilterList from "~~/components/cocktails/FilterList.vue";
import Pagination from "~~/components/dump/Pagination.vue";
export default {
  components: { SearchField, FilterList, Pagination, CocktailsList },
  name: "CocktailsPage",
  props: {
    cocktails: {
      type: Array,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    cocktailsFull: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updateCocktails(payload) {
      this.$emit("updateCocktails", payload);
    },
  },
};
</script>

<style lang="scss" scoped>
.img {
  display: block;
}
.сocktails {
  &__header {
    margin-bottom: $shortMargin;
  }
  &__body {
    display: flex;
  }
  &__filter {
    width: 250px;
    padding-right: 25px;
  }
  &__list {
    width: calc(100% - 250px);
  }
}
</style>
