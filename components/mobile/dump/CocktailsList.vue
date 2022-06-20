<template>
  <div>
    <div class="list__item" v-for="cocktail in cocktails" :key="cocktail.id">
      <CocktailsCart :cocktail="cocktail" />
    </div>
  </div>
</template>

<script>
import CocktailsCart from "~~/components/mobile/dump/CocktailsCart.vue";
export default {
  name: "CocktailsList",
  components: { CocktailsCart },
  props: {
    cocktails: {
      type: Array,
      require: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  display: block;
  &__item {
    &:not(:last-child) {
      padding-bottom: 8px;
    }
  }
}
</style>
