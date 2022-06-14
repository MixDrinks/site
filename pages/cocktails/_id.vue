<template>
  <main class="wrapper">
    <div class="display">&nbsp;</div>
    <component v-if="isMobile" :is="CocktailPageMob" :cocktail="cocktail" />
    <component v-else :is="CocktailPage" :cocktail="cocktail" />
  </main>
</template>

<script>
import { getCocktail, cocktailsVisit } from "~~/api";
export default {
  async asyncData({ route, error }) {
    const cocktail = await getCocktail(`?id=${route.params.id}`).catch(() => {
      return error({
        statusCode: 404,
        message: "This page could not be found",
      });
    });
    return {
      cocktail: cocktail.data,
    };
  },
  methods: {
    CocktailPage: () => {
      return import("~~/components/cocktails/CocktailPage.vue");
    },
    CocktailPageMob: () => {
      return import("~~/components/mobile/cocktails/CocktailPage.vue");
    },
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
    canonical() {
      return process.env.baseUrl + this.$nuxt.$route.path;
    },
  },
  head() {
    return {
      title: `Коктейль ${this.cocktail.name} в домашніх умовах`,
      link: [{ rel: "canonical", href: this.canonical }],
      meta: [
        {
          hid: "description",
          name: "description",
          content: `Як приготувати коктейль ${this.cocktail.name} в домашніх умовах, читайте тут!`,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: `Коктейль ${this.cocktail.name} в домашніх умовах`,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: `Як приготувати коктейль ${this.cocktail.name} в домашніх умовах, читайте тут!`,
        },
        {
          hid: "og:url",
          property: "og:url",
          content: `${this.canonical}`,
        },
      ],
    };
  },
  mounted() {
    cocktailsVisit(this.$nuxt.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  @include defaultWrapper;
}
.display {
  display: none;
}
</style>
