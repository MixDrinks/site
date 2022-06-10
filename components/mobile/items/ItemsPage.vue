<template>
  <div class="items">
    <h1 class="items__title" itemprop="name">{{ items.name }}</h1>
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
          width="320"
          height="320"
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
      <CocktailsList
        class="cocktails__list"
        :cocktails="cocktailsFull.cocktails"
      />
    </div>
    <Pagination
      class="items__pagination"
      :totalItems="cocktailsFull.totalCount"
      :limit="10"
      :itemsCount="cocktailsFull.cocktails.length"
      @updateCocktails="updateCocktails"
    />
  </div>
</template>

<script>
import CocktailsList from "~~/components/mobile/dump/CocktailsList.vue";
import Pagination from "~~/components/mobile/dump/Pagination.vue";
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
    margin-bottom: $halfShortMargin;
  }
  &__list {
    margin-bottom: $halfShortMargin;
  }
}
.items {
  &__title {
    @include fontSize48B;
    margin-bottom: $halfShortMargin;
  }
  &__img {
    position: relative;
    padding-top: 100%;
    margin-bottom: $halfShortMargin;

    .img {
      @include fullPseudoElement;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  &__about {
    margin-bottom: $halfShortMargin;
  }
}
.about {
  margin-bottom: $halfShortMargin;
  &__title {
    color: $colorBlack;
    @include fontSize24B;

    margin-bottom: $halfShortMargin;
  }
  &__text {
    @include fontSize18M;
  }
}
</style>
