<template>
  <div class="cocktails">
    test
    <div class="cocktails__header">
      <FieldSearch :listSearch="cocktailsShort" />
    </div>
    <div class="cocktails__body">
      <FilterList
        class="cocktails__filter"
        @updateCocktails="updateCocktails"
        :filterList="tags"
      />
      <div class="cocktails__list">
        <CocktailsList :cocktails="cocktailsFull.cocktails" />
      </div>
    </div>
    <!-- <div class="cocktails__footer">
      <Pagination
        class="cocktails__pagination"
        :totalItems="cocktailsFull.totalCount"
        :limit="10"
        :itemsCount="cocktailsFull.cocktails.length"
        @updateCocktails="updateCocktails"
      />
    </div> -->
  </div>
</template>

<script>
import CocktailsList from "~~/components/dump/CocktailsList.vue";
import FieldSearch from "~~/components/dump/UI/FieldSearch.vue";
import FilterList from "~~/components/cocktails/FilterList.vue";
import Pagination from "~~/components/dump/Pagination.vue";
export default {
  components: { FieldSearch, FilterList, Pagination, CocktailsList },
  name: "CocktailsPage",
  props: {
    cocktailsShort: {
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
.cocktails {
  &__header {
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
