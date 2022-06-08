<template>
  <div class="list">
    <div class="list__item" v-for="cocktail in cocktails" :key="cocktail.id">
      <div class="list__item">
        {{ cocktail.name }}
      </div>
      <div class="list__img">
        <picture>
          <source
            v-for="img in cocktail.images"
            :key="img.id"
            :srcset="img.srcset"
            :media="img.media"
            :type="img.type"
          />
          <img class="img" width="960" height="600" loading="lazy" />
        </picture>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CocktailsList",
  props: {
    cocktails: {
      type: Array,
      require: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
