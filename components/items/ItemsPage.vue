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
    </div>
    <div class="items__footer"></div>
  </div>
</template>

<script>
export default {
  name: "ItemsPage",
  props: {
    items: {
      type: Object,
      require: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.items {
  &__title {
    @include fontSize48B;
    margin-bottom: $shortMargin;
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
