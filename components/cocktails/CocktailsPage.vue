<template>
  <div class="cocktails">
    <div class="cocktails__header">
      <h1 class="cocktails__title">Коктейлі</h1>
      <Sorting @updateCocktails="updateCocktails" />
    </div>
    <div class="cocktails__body">
      <FilterList
        class="cocktails__filter"
        @updateCocktails="updateCocktails"
        :filterList="allFilters"
        :tagsCount="cocktailsFull.cocktailsByTagCounts"
        :goodCount="cocktailsFull.cocktailsByGoodCounts"
        :toolCount="cocktailsFull.cocktailsByToolCounts"
        :totalCount="cocktailsFull.totalCount"
      />
      <div class="cocktails__list">
        <CocktailsList :cocktails="cocktailsFull.cocktails" />
      </div>
    </div>
    <div class="cocktails__footer">
      <Pagination
        v-if="cocktailsFull.totalCount > 10"
        class="cocktails__pagination"
        :totalItems="cocktailsFull.totalCount"
        :limit="10"
        :itemsCount="cocktailsFull.cocktails.length"
        @updateCocktails="updateCocktails"
      />
    </div>
  </div>
</template>

<script>
import CocktailsList from "~~/components/dump/CocktailsList.vue";
import FilterList from "~~/components/cocktails/FilterList.vue";
import Pagination from "~~/components/dump/Pagination.vue";
import Sorting from "~~/components/cocktails/Sorting.vue";
export default {
  components: { FilterList, Pagination, CocktailsList, Sorting },
  name: "CocktailsPage",
  props: {
    tags: {
      type: Array,
      required: true,
    },
    allFilters: {
      require: true,
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
.cocktails {
  &__title {
    @include fontSize48B;
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $shortMargin;
  }
  &__footer {
    margin-top: $shortMargin;
  }
  &__body {
    display: flex;
    margin-top: $shortMargin;
    margin-bottom: $shortMargin;
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
