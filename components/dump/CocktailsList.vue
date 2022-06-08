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
  align-items: stretch;
  margin-left: -15px;
  margin-right: -15px;
  &__item {
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 30px;
  }
}
</style>
