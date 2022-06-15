<template>
  <div class="cocktails">
    <h1 class="cocktails__title">Коктейлі</h1>
    <Sorting class="cocktails__sorting" @updateCocktails="updateCocktails" />
    <FilterList
      class="cocktails__filter"
      @updateCocktails="updateCocktails"
      :filterList="tags"
      :tagsCount="cocktailsFull.cocktailsByTagCounts"
      :totalCount="cocktailsFull.totalCount"
    />
    <CocktailsList
      class="cocktails__list"
      :cocktails="cocktailsFull.cocktails"
    />
    <Pagination
      v-if="cocktailsFull.totalCount > 10"
      class="cocktails__pagination"
      :totalItems="cocktailsFull.totalCount"
      :limit="10"
      :itemsCount="cocktailsFull.cocktails.length"
      @updateCocktails="updateCocktails"
    />
  </div>
</template>

<script>
import CocktailsList from "~~/components/mobile/dump/CocktailsList.vue";
import FilterList from "~~/components/mobile/cocktails/FilterList.vue";
import Pagination from "~~/components/mobile/dump/Pagination.vue";
import Sorting from "~~/components/cocktails/Sorting.vue";
export default {
  components: { FilterList, Pagination, CocktailsList, Sorting },
  name: "CocktailsPage",
  props: {
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
.cocktails {
  &__title {
    @include fontSize48B;
    margin-bottom: $halfShortMargin;
  }
  &__search {
    margin-bottom: $halfShortMargin;
  }
  &__list {
    margin-bottom: $halfShortMargin;
  }
  &__sorting {
    margin-bottom: $halfShortMargin;
  }
}
</style>
