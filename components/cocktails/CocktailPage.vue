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
      <div class="cocktail-body__goods cocktail-body-goods">
        <h2 class="cocktail-body-goods__title cocktail-body-goods-title">
          <span class="cocktail-body-goods-title__label">
            Склад коктейлю {{ cocktail.name }}
          </span>
        </h2>
        <div class="cocktail-body-goods__counter cocktail-body-goods-counter">
          <IconBtn
              class="cocktail-body-goods-counter__btn cocktail-body-goods-counter__btn--dec"
              :lock="counter === 1"
              icon="/img/icons/minus.svg"
              @click="dec()"/>

          <div class="cocktail-body-goods-counter__value">
            {{ counter }}
          </div>
          <IconBtn
              class="cocktail-body-goods-counter__btn cocktail-body-goods-counter__btn--inc"
              icon="/img/icons/plus.svg"
              @click="inc()"
          />
        </div>
        <ul class="cocktail-body-goods__list cocktail-body-goods-list">
          <li class="cocktail-body-goods-list__item cocktail-body-goods-list-item" v-for="good in cocktail.goods" :key="good.id">
            <NuxtLink class="cocktail-body-goods-list-item__link cocktail-body-goods-list-item-link" :to="`/goods/${good.id}`">
              <picture
                class="cocktail-body-goods-list-item-link__picture">
                  <source
                    v-for="img in good.images"
                    :key="img.id"
                    :srcset="img.srcset"
                    :media="img.media"
                    :type="img.type"
                  />
                  <img
                    class="cocktail-body-goods-list-item-link__img"
                    width="150"
                    height="150"
                    loading="lazy"
                    :alt="`Зображення ${good.name}`"
                    title=""
                  />
                </picture>
              <div class="cocktail-body-goods-list-item-link__label">
                {{ good.name }}<br /><strong>
                  {{ good.amount * counter }} {{ good.unit }}.
                </strong>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="cocktail-body__tools cocktail-body-tools">
        <h2 class="cocktail-body-tools__title cocktail-body-tools-title">
          <span class="cocktail-body-tools-title__label">
            Потрібні штучки для пригоування {{ cocktail.name }}
          </span>
        </h2>
        <ul class="cocktail-body-tools__list cocktail-body-tools-list">
          <li class="cocktail-body-tools-list__item cocktail-body-tools-list-item" v-for="tool in cocktail.tools" :key="tool.id">
            <NuxtLink class="cocktail-body-tools-list-item__link cocktail-body-tools-list-item-link" :to="`/tools/${tool.id}`">
              <picture class="cocktail-body-tools-list-item-link__picture">
                  <source
                    v-for="img in tool.images"
                    :key="img.id"
                    :srcset="img.srcset"
                    :media="img.media"
                    :type="img.type"
                  />
                  <img
                    class="cocktail-body-tools-list-item-link__img"
                    width="150"
                    height="150"
                    loading="lazy"
                    :alt="`Зображення ${tool.name}`"
                    title=""
                  />
                </picture>
              <div class="cocktail-body-tools-list-item-link__label">
                {{ tool.name }}
              </div>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Rating from "~~/components/cocktails/Rating.vue";
import IconBtn from "~/components/dump/UI/buttons/IconBtn.vue";

export default {
  name: "CocktailPage",
  components: {IconBtn, Rating },
  data: () => ({
        counter: 1
      }
  ),
  methods: {
    inc() {
      this.counter++
    },
    dec() {
      if (this.counter > 1) {
        this.counter--
      }
    }
  },
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
