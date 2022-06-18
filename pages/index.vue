<template>
  <main class="wrapper">
    <div class="display">&nbsp;</div>
    <component
      v-if="isMobile"
      :is="CocktailsPageMob"
      :cocktailsFull="cocktailsFull"
      :allFilters="allFilters"
      @updateCocktails="updateCocktails"
    />
    <component
      v-else
      :is="CocktailsPage"
      :cocktailsFull="cocktailsFull"
      :allFilters="allFilters"
      @updateCocktails="updateCocktails"
    />
  </main>
</template>

<script>
import { getTags, getCocktails, getAllFilters } from "~~/api";
export default {
  async asyncData({ query, error }) {
    let queryParams = "?";
    if (query && !query.page) {
      queryParams = "?page=0";
    }
    for (let [key, value] of Object.entries(query)) {
      queryParams = `${queryParams}&${key}=${value}`;
    }
    const cocktailsFullPromise = getCocktails(queryParams).catch(() => {
      return error({
        statusCode: 404,
        message: "This page could not be found",
      });
    });
    const allFiltersPromise = getAllFilters().catch(() => {
      return error({
        statusCode: 404,
        message: "This page could not be found",
      });
    });
    const [cocktailsFull, allFilters] = await Promise.all([
      cocktailsFullPromise,
      allFiltersPromise,
    ]);
    return {
      cocktailsFull: cocktailsFull.data,
      allFilters: allFilters.data,
    };
  },
  methods: {
    async updateCocktails(payload) {
      // this.startLoading()
      let items = [...this.cocktailsFull.cocktails];
      let queryParams = "?";
      if (this.$nuxt.$route.query && !this.$nuxt.$route.query.page) {
        queryParams = "?page=0";
      }
      for (let [key, value] of Object.entries(this.$nuxt.$route.query)) {
        queryParams = `${queryParams}&${key}=${value}`;
      }
      const cocktails = await getCocktails(queryParams);
      this.cocktailsFull = { ...cocktails.data };
      if (payload?.loadMore) {
        this.cocktailsFull.cocktails = [
          ...items,
          ...this.cocktailsFull.cocktails,
        ];
      }
      // this.endLoading()
    },
    CocktailsPage: () => {
      return import("~~/components/cocktails/CocktailsPage.vue");
    },
    CocktailsPageMob: () => {
      return import("~~/components/mobile/cocktails/CocktailsPage.vue");
    },
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
    canonical() {
      return process.env.baseUrl + this.$nuxt.$route.path;
    },
    indexPage() {
      if (Object.entries(this.$nuxt.$route.query).length === 0) {
        return "index, follow";
      } else {
        return "noindex, nofollow";
      }
    },
  },
  head() {
    return {
      title: "Колекція коктейлів 🍹 та рецептів до них в домашніх умовах",
      link: [{ rel: "canonical", href: this.canonical }],
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Коктейлі алкогольні 🍸 та безалкогольні 🍹 з фото та рецептами, оберий який подобаєтья тобі",
        },
        {
          hid: "og:title",
          name: "og:title",
          content: "Колекція коктейлів 🍹 та рецептів до них в домашніх умовах",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Коктейлі алкогольні 🍸 та безалкогольні 🍹 з фото та рецептами, оберий який подобаєтья тобі",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: `${this.canonical}`,
        },
        { name: "robots", content: this.indexPage },
      ],
    };
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
