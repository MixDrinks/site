<template>
  <div class="list">
    <div class="list__item" v-for="cocktail in cocktails" :key="cocktail.id">
      <CocktailsCart :cocktail="cocktail" />
    </div>
  </div>
</template>

<script>
import CocktailsCart from "~~/components/dump/CocktailsCart.vue";
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
  display: flex;
  flex-wrap: wrap;
  margin-left: -25px;
  margin-right: -25px;
  &__item {
    padding-left: 25px;
    padding-right: 25px;
    padding-bottom: 25px;
  }
}
</style>
