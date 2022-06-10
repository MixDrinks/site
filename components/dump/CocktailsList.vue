<template>
  <transition-group class="list" name="fate-in" mode="page" appear>
    <div class="list__item" v-for="cocktail in cocktails" :key="cocktail.id">
      <CocktailsCart :cocktail="cocktail" />
    </div>
  </transition-group>
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
.fate-in-enter-active {
  animation: fade-in $defaultAnimTime;
}

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
    @media (max-width: 767px) {
      width: 100%;
    }
    @media (min-width: 768px) and (max-width: 1199px) {
      width: 50%;
    }
    @media (min-width: 1200px) and (max-width: 1599px) {
      width: calc(100% / 3);
    }
    @media (min-width: 1600px) {
      width: 25%;
    }
  }
}
</style>
