<template>
  <div class="item">
    <div class="item__img">
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
    <div class="item__name">
      {{ cocktail.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CocktailsCart",
  props: {
    cocktail: {
      type: Object,
      require: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  max-width: 300px;
  &__img {
    .img {
      max-width: 100%;
      height: auto;
    }
  }
  &__name {
    @include fontSize18B;
  }
}
</style>
