<template>
  <div class="сocktails">
    <div class="сocktails__header">
      <SearchField :list="cocktails" />
    </div>
    <div class="сocktails__body">
      <FilterList :filterList="tags" />
    </div>

    <!-- <div class="" v-for="cocktail in cocktails" :key="cocktail.id">
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
    </div> -->
  </div>
</template>

<script>
import SearchField from "~~/components/dump/UI/UX/SearchField.vue";
import FilterList from "~~/components/cocktails/FilterList.vue";
export default {
  components: { SearchField, FilterList },
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
