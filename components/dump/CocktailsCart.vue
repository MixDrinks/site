<template>
  <NuxtLink :to="`/cocktails/${cocktail.id}`" class="item">
    <div class="item__info" v-if="!!cocktail.rating || !!cocktail.visitCount">
      <div class="item__rating rating" v-if="!!cocktail.rating">
        <div class="rating__text">{{ cocktail.rating }}</div>
      </div>
      <div class="item__visit-count visit-count" v-if="!!cocktail.visitCount">
        <div class="visit-count__text">{{ cocktail.visitCount }}</div>
      </div>
    </div>
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
  .visit-count {
    display: flex;
    align-items: center;
    &__text {
      color: $colorBlack;
      margin-left: 10px;
      @include fontSize14;
    }
    &::before {
      content: "";
      width: 16px;
      height: 16px;
      display: inline-block;
      background-color: $colorMain;
      mask-size: cover;
      mask-image: url("/img/icons/eye.svg");
    }
  }
  .rating {
    display: flex;
    align-items: center;
    &__text {
      color: $colorBlack;
      margin-left: 10px;
      @include fontSize14;
    }
    &::before {
      content: "";
      width: 16px;
      height: 16px;
      display: inline-block;
      background-color: $colorRating;
      mask-size: cover;
      mask-image: url("/img/icons/star.svg");
    }
  }
  &__rating {
    margin-right: 10px;
  }
  &__info {
    margin-bottom: $halfShortMargin;
    display: flex;
    justify-content: flex-end;
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
    &::first-letter {
      text-transform: uppercase;
    }
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
