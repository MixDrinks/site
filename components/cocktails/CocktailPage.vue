<template>
  <div class="cocktail">
    <div class="cocktail__header cocktail-header">
      <h1 class="cocktail-header-title cocktail-header__title" itemprop="name">
        <span class="cocktail-header-title__label">
          {{ cocktail.name }}
        </span>
      </h1>
      <div class="cocktail-header__user-info cocktail-header-user-info">
        <div class="cocktail-header-user-info__views" v-if="!!cocktail.visitCount">
          Переглядів <strong>{{ cocktail.visitCount }}</strong>
        </div>
        <Rating
          class="cocktail-header-user-info__rating"
          :ratingCount="cocktail.ratingCount"
          :ratingValue="cocktail.rating"
        />
      </div>
    </div>
    <ul class="cocktail__tags cocktail-tags">
      <li class="cocktail-tags__item cocktail-tags-item" v-for="tag in cocktail.tags" :key="tag.id">
        <NuxtLink :to="`/?tags=${tag.id}`" class="cocktail-tags-item__link cocktail-tags-item-link">
          <span class="cocktail-tags-item-link__label">{{ tag.name }}</span>
        </NuxtLink>
      </li>
    </ul>
    <div class="cocktail__body cocktail-body">
      <picture class="cocktail-body__picture">
        <source
          v-for="img in cocktail.images"
          :key="img.id"
          :srcset="img.srcset"
          :media="img.media"
          :type="img.type"
        />
        <img
          class="cocktail-body__img"
          width="500"
          height="500"
          loading="lazy"
          :alt="`Зображення коктейля ${cocktail.name}`"
          title=""
        />
      </picture>
      <div class="cocktail-body__recipe cocktail-body-recipe">
        <h2 class="cocktail-body-recipe__title cocktail-body-recipe-title">
          <span class="cocktail-body-recipe-title__label">
            Рецепт коктейлю {{ cocktail.name }}
          </span>
        </h2>
        <ol class="cocktail-body-recipe__list cocktail-body-recipe-list" itemprop="recipeInstructions">
          <li
            class="cocktail-body-recipe-list__item cocktail-body-recipe-list-item"
            v-for="recipeItem in cocktail.receipt"
            :key="recipeItem"
          >
            <span class="cocktail-body-recipe-list-item__label">{{ recipeItem }}</span>
          </li>
        </ol>
      </div>
      <CocktailComponents class="cocktail-body__goods" :title="`Склад коктейлю ${cocktail.name}`" :components="cocktail.goods" withCounter />
      <CocktailComponents class="cocktail-body__tools" :title="`Потрібні штучки для приготування ${cocktail.name}`" :components="cocktail.tools" />
    </div>
  </div>
</template>

<script>
import Rating from "~~/components/cocktails/Rating.vue";
import IconBtn from "~/components/dump/UI/buttons/IconBtn.vue";
import CocktailComponents from "~~/components/cocktails/CocktailComponents.vue";

export default {
  name: "CocktailPage",
  components: { IconBtn, Rating, CocktailComponents },
  props: {
    cocktail: {
      type: Object,
      require: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import './styles/cocktail-page'
</style>
