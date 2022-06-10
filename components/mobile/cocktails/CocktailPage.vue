<template>
  <div class="cocktail">
    <h1 class="cocktail__title" itemprop="name">{{ cocktail.name }}</h1>
    <ul class="cocktail__tags tags">
      <li class="tags__item" v-for="tag in cocktail.tags" :key="tag.id">
        <NuxtLink :to="`/cocktails?tags=${tag.id}`" class="tags__link">
          <span class="tags__name">{{ tag.name }}</span>
        </NuxtLink>
      </li>
    </ul>
    <div class="cocktail__img">
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
          width="320"
          height="320"
          loading="lazy"
          :alt="`Зображення коктейля ${cocktail.name}`"
          title=""
        />
      </picture>
    </div>
    <div class="cocktail__recipe recipe">
      <div class="recipe__title">Рецепт коктейлю {{ cocktail.name }}</div>
      <ol class="recipe__list" itemprop="recipeInstructions">
        <li
          class="recipe__item"
          v-for="recipeItem in cocktail.receipt"
          :key="recipeItem"
        >
          <span class="recipe__text">{{ recipeItem }}</span>
        </li>
      </ol>
    </div>
    <div class="cocktail__goods goods">
      <div class="goods__title">Склад коктейлю {{ cocktail.name }}</div>
      <ul class="goods__list">
        <li class="goods__item" v-for="good in cocktail.goods" :key="good.id">
          <NuxtLink class="goods__link" :to="`/ingredients/${good.id}`">
            <div class="goods__img">
              <picture>
                <source
                  v-for="img in good.images"
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
                  :alt="`Зображення ${good.name}`"
                  title=""
                />
              </picture>
            </div>
            <div class="goods__name">
              {{ good.name }}<br /><strong>
                {{ good.amount }} {{ good.unit }}.
              </strong>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="cocktail__tools tools">
      <div class="tools__title">
        Потрібні штучки для пригоування {{ cocktail.name }}
      </div>
      <ul class="tools__list">
        <li class="tools__item" v-for="tool in cocktail.tools" :key="tool.id">
          <NuxtLink class="tools__link" :to="`/ingredients/${tool.id}`">
            <div class="tools__img">
              <picture>
                <source
                  v-for="img in tool.images"
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
                  :alt="`Зображення ${tool.name}`"
                  title=""
                />
              </picture>
            </div>
            <div class="tools__name">{{ tool.name }}</div>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="cocktail__footer"></div>
  </div>
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

<style lang="scss" scoped>
.cocktail {
  &__title {
    @include fontSize48B;
  }
  &__img {
    position: relative;
    padding-top: 100%;

    .img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  &__tags,
  &__recipe,
  &__goods,
  &__tools,
  &__img,
  &__title {
    margin-bottom: $halfShortMargin;
  }
}
.tools,
.goods {
  &__title {
    color: $colorBlack;
    @include fontSize24B;

    margin-bottom: $halfShortMargin;
  }
  &__list {
    display: flex;
    overflow: auto;
    margin-left: -40px;
    padding-left: 40px;
    margin-right: -40px;
    padding-right: 40px;

    @include scrollNone;
  }
  &__link {
    display: block;
    height: 100%;
    max-width: 110px;
    padding: 4px 4px 12px;
    border-radius: 8px;

    transition: transform $defaultAnimTime, box-shadow $defaultAnimTime;
    &:hover {
      .tools,
      .goods {
        &__name {
          color: $colorHover;
        }
      }
      transform: translateY(-4px);
      box-shadow: 1px 4px rgba($colorHover, 0.3);
    }
  }
  &__item {
    padding: 4px;
  }
  &__name {
    max-width: 150px;
    color: $colorMain;
    @include fontSize14;
    text-align: center;

    margin-top: 12px;

    transition: color $defaultAnimTime;
  }
  &__img {
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid $colorMain;
    .img {
      display: block;
      object-fit: contain;
      padding: 5px;
    }
  }
}

.recipe {
  &__title {
    color: $colorBlack;
    @include fontSize24B;

    margin-bottom: $halfShortMargin;
  }
  list-style: none;
  counter-reset: counter;
  &__item {
    position: relative;

    display: flex;
    align-items: center;

    counter-increment: counter;
    &::before {
      @include fontSize18B;
      color: $colorWhite;

      width: 34px;
      height: 34px;

      margin-right: 16px;

      border-radius: 4px;

      display: flex;
      align-items: center;
      justify-content: center;
      flex-basis: 34px;

      background-color: $colorMain;

      content: counter(counter);
    }
    &:not(:last-child) {
      margin-bottom: $halfShortMargin;
      padding-bottom: $halfShortMargin;

      border-bottom: 1px solid $colorMain;
    }
  }
  &__text {
    flex-basis: calc(100% - 50px);
    @include fontSize18M;
  }
}
.tags {
  display: flex;
  overflow: auto;
  margin-left: -40px;
  padding-left: 40px;
  margin-right: -40px;
  padding-right: 40px;

  @include scrollNone;
  &__item {
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
  &__name {
    white-space: nowrap;
    font-style: italic;
    @include fontSize16M;
    display: block;
    padding: 3px 8px;
    border-radius: 4px;
    background-color: $colorMain;
    color: $colorWhite;

    transition: background-color $defaultAnimTime;
    &::first-letter {
      text-transform: uppercase;
    }
    &:hover {
      background-color: $colorHover;
    }
  }
}
</style>
