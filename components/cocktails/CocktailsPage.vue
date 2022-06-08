<template>
  <div class="сocktails">
    <div class="сocktails__header">
      <SearchField :list="cocktails" />
    </div>

    <div class="сocktails__body">
      <FilterList class="сocktails__filter" :filterList="tags" />
      <div class="сocktails__list">
        <CocktailsList :cocktails="cocktailsFull.cocktails" />
      </div>
    </div>
    <div class="сocktails__footer">
      <ClientOnly>
        <Pagination
          class="сocktails__pagination"
          :totalItems="totalItems"
          :limit="limit"
          :itemsCount="10"
          @updateCocktails="updateCocktails"
        />
      </ClientOnly>
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
  computed: {
    itemsCount() {
      return this.cocktailsFull.cocktails.length;
    },
    totalItems() {
      return this.cocktailsFull.totalCount;
    },
    limit() {
      return 10;
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
  }
  &__list {
    width: calc(100% - 250px);
  }
}
</style>
