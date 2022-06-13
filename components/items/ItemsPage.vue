<template>
  <div class="items">
    <div class="items__header">
      <h1 class="items__title" itemprop="name">{{ items.name }}</h1>
    </div>
    <div class="items__body">
      <div class="items__img">
        <picture>
          <source
            v-for="img in items.images"
            :key="img.id"
            :srcset="img.srcset"
            :media="img.media"
            :type="img.type"
          />
          <img
            class="img"
            width="500"
            height="500"
            loading="lazy"
            :alt="`Зображення ${items.name}`"
            title=""
          />
        </picture>
      </div>
      <div class="items__about about">
        <div class="about__title">Опис {{ items.name }}</div>
        <div class="about__text">{{ items.about }}</div>
      </div>
      <div class="items__list cocktails">
        <h2 class="cocktails__title">
          Коктейлі з використанням {{ items.name }}
        </h2>
        <CocktailsList :cocktails="cocktailsFull.cocktails" />
      </div>
    </div>
    <div class="items__footer">
      <Pagination
        v-if="cocktailsFull.totalCount > 10"
        class="items__pagination"
        :totalItems="cocktailsFull.totalCount"
        :limit="10"
        :itemsCount="cocktailsFull.cocktails.length"
        @updateCocktails="updateCocktails"
      />
    </div>
  </div>
</template>

<script>
import CocktailsList from "~~/components/dump/CocktailsList.vue";
import Pagination from "~~/components/dump/Pagination.vue";
export default {
  components: { Pagination, CocktailsList },
  name: "ItemsPage",
  props: {
    items: {
      type: Object,
      require: true,
    },
    cocktailsFull: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updateCocktails(payload) {
      this.$emit("updateCocktails", payload);
    },
  },
};
</script>

<style lang="scss" scoped>
.cocktails {
  &__title {
    @include fontSize24B;
    color: $colorBlack;
    margin-bottom: $shortMargin;
  }
}
.items {
  &__title {
    @include fontSize48B;
    margin-bottom: $shortMargin;
  }
  &__footer {
    margin-top: $shortMargin;
  }
  &__list {
    flex-basis: 100%;
  }
  &__img {
    flex-basis: 500px;

    margin-bottom: $shortMargin;

    .img {
      display: block;
      object-fit: contain;
    }
  }
  &__about {
    margin-bottom: $shortMargin;

    flex-basis: calc(100% - 500px);
    padding-left: 100px;
  }
  &__body {
    display: flex;
    flex-wrap: wrap;
  }
}
.about {
  &__title {
    color: $colorBlack;
    @include fontSize24B;

    margin-bottom: $shortMargin;
  }
  &__text {
    @include fontSize18M;
  }
}
</style>
