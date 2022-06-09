<template>
  <div>{{ cocktail }}</div>
</template>

<script>
export default {
  name: "CocktailPage",
  props: {
    cocktail: {
      type: Object,
      require: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
