<template>
  <div>
    <SearchField :list="cocktails" />
    <div class="" v-for="cocktail in cocktails" :key="cocktail.id">
      {{ cocktail.name }}
      <picture>
        <source
          v-for="img in cocktail.images"
          :srcset="img.srcset"
          :media="img.media"
          :type="img.type"
        />
        <img class="img" width="960" height="600" loading="lazy" />
      </picture>
    </div>
  </div>
</template>

<script>
import SearchField from "~~/components/dump/UI/UX/SearchField.vue";
export default {
  components: { SearchField },
  name: "CocktailsPage",
  props: {
    cocktails: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
