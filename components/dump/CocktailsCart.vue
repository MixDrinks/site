<template>
  <NuxtLink :to="`/cocktails/${cocktail.id}`" class="item">
    <div class="item__img">
      <picture>
        <source
          v-for="img in cocktail.images"
          :key="img.id"
          :srcset="img.srcset"
          :media="img.media"
          :type="img.type"
        />
        <img
          class="img"
          width="298"
          height="298"
          loading="lazy"
          :alt="`Зображення коктейля ${cocktail.name}`"
          title=""
        />
      </picture>
    </div>
    <div class="item__name">
      {{ cocktail.name }}
    </div>
    <div class="item__info" v-if="!!cocktail.rating || !!cocktail.visitCount">
      <div class="item__rating" v-if="!!cocktail.rating">
        Оцінка користувачів <strong>{{ cocktail.rating }}</strong>
      </div>
      <div class="item__visit-count" v-if="!!cocktail.visitCount">
        Кількість переглядів <strong>{{ cocktail.visitCount }}</strong>
      </div>
    </div>
  </NuxtLink>
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
  &__info {
    margin-top: $halfShortMargin;
    text-align: center;
    @include fontSize14;
    color: $colorMain;
  }
  display: block;

  width: 100%;
  height: 100%;
  padding: 20px;
  // border: 1px solid rgba($colorMain, 0.1);
  border-radius: 8px;

  transition: transform $defaultAnimTime, box-shadow $defaultAnimTime;
  &__img {
    position: relative;
    padding-top: 100%;
    width: 100%;
    .img {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  &__name {
    color: $colorMain;
    text-align: center;
    margin-top: $shortMargin;

    @include fontSize18B;

    transition: color $defaultAnimTime;
  }
  &:hover {
    .item {
      &__name {
        color: $colorHover;
      }
    }
    transform: translateY(-10px);
    box-shadow: 1px 10px rgba($colorHover, 0.3),
      -5px -5px 40px rgba($colorHover, 0.1);
  }
}
</style>
