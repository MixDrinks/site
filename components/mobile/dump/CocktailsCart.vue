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
          width="100"
          height="100"
          loading="lazy"
          :alt="`Зображення коктейля ${cocktail.name}`"
          title=""
        />
      </picture>
    </div>
    <div class="item__info">
      <div class="item__name">
        {{ cocktail.name }}
      </div>
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
  &__rating,
  &__visit-count {
    @include fontSize14;
    color: $colorMain;
  }
  display: flex;
  align-items: center;

  padding: 10px;
  border: 1px solid rgba($colorMain, 0.1);
  border-radius: 8px;

  transition: transform $defaultAnimTime, box-shadow $defaultAnimTime;
  &__img {
    height: 100px;
    width: 100px;
    .img {
      object-fit: cover;
      border-radius: 8px;
    }
  }
  &__info {
    width: calc(100% - 100px);
    padding-left: 10px;
  }
  &__name {
    color: $colorMain;
    @include fontSize18B;

    transition: color $defaultAnimTime;
  }
  &:hover {
    .item {
      &__name {
        color: $colorHover;
      }
    }
    transform: translateY(-4px);
    box-shadow: 1px 4px rgba($colorHover, 0.3),
      -5px -5px 40px rgba($colorHover, 0.1);
  }
}
</style>
