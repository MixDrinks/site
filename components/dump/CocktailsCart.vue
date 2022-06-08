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
        <img class="img" width="258" height="258" loading="lazy" />
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
  padding: 20px;
  border: 1px solid rgba($colorMain, 0.1);
  border-radius: 8px;
  &__img {
    .img {
      max-width: 258;
      height: 258;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  &__name {
    text-align: center;
    margin-top: $shortMargin;
    min-height: 52px;

    @include fontSize18B;
  }
}
</style>
