<template>
  <transition name="fate-in" appear>
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
        <div class="item__user-info">
          <div class="item__rating rating" v-if="!!cocktail.rating">
            <div class="rating__text">
              {{ Number(cocktail.rating.toFixed(1)) }}
            </div>
          </div>
          <div
            class="item__visit-count visit-count"
            v-if="!!cocktail.visitCount"
          >
            <div class="visit-count__text">{{ cocktail.visitCount }}</div>
          </div>
        </div>
        <div class="item__name">
          {{ cocktail.name }}
        </div>
      </div>
    </NuxtLink>
  </transition>
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
.fate-in-enter-active {
  animation: fade-in $defaultAnimTime;
}

.item {
  &__user-info {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    top: 5px;
    right: 5px;
  }
  &__rating {
    margin-right: 10px;
  }
  .visit-count {
    display: flex;
    align-items: center;
    &__text {
      color: $colorBlack;
      margin-left: 5px;
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
      margin-left: 5px;
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
  &__rating,
  &__visit-count {
    @include fontSize14;
    color: $colorMain;
  }

  position: relative;
  display: flex;
  align-items: stretch;

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
    padding: 20px 0 20px 10px;
    display: flex;
    align-items: center;
  }
  &__name {
    &::first-letter {
      text-transform: uppercase;
    }

    color: $colorMain;
    @include fontSize18B;

    transition: color $defaultAnimTime;
  }
  &:focus {
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
