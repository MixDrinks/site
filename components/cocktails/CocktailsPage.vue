<template>
  <div class="сocktails">
    <div class="сocktails__footer">
      <Pagination
        v-if="limit < totalItems"
        class="сocktails__pagination"
        :totalItems="totalItems"
        :limit="limit"
        :itemsCount="10"
        @updateCocktails="updateCocktails"
      />
    </div>
    <div class="сocktails__header">
      <SearchField :list="cocktails" />
    </div>
    <div
      class=""
      v-for="cocktail in cocktailsFull.cocktails"
      :key="cocktail.id"
    >
      {{ cocktail.name }}
      <picture>
        <source
          v-for="img in cocktail.images"
          :key="img.id"
          :srcset="img.srcset"
          :media="img.media"
          :type="img.type"
        />
        <img class="img" width="960" height="600" loading="lazy" />
      </picture>
    </div>
    <div class="сocktails__body">
      <FilterList :filterList="tags" />
    </div>
  </div>
</template>

<script>
import SearchField from "~~/components/dump/UI/SearchField.vue";
import FilterList from "~~/components/cocktails/FilterList.vue";
import Pagination from "~~/components/dump/Pagination.vue";
export default {
  components: { SearchField, FilterList, Pagination },
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
}
</style>
