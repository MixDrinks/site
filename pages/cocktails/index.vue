<template>
  <main class="wrapper">
    <CocktailsPage
      :cocktailsFull="cocktailsFull"
      :cocktails="cocktails"
      :tags="tags"
      @updateCocktails="updateCocktails"
    />
  </main>
</template>

<script>
import CocktailsPage from "~~/components/cocktails/CocktailsPage.vue";
import { getСocktailsShort, getTags, getСocktails } from "~~/api";
export default {
  async asyncData({ query, error }) {
    let queryParams = "?";
    if (query && !query.page) {
      queryParams = "?page=0";
    }
    for (let [key, value] of Object.entries(query)) {
      queryParams = `${queryParams}&${key}=${value}`;
    }
    const cocktailsFullPromise = getСocktails(queryParams).catch(() => {
      return error({
        statusCode: 404,
        message: "This page could not be found",
      });
    });
    // const cocktailsPromise = getСocktailsShort().catch(() => {
    //   return error({
    //     statusCode: 404,
    //     message: "This page could not be found",
    //   });
    // });
    const tagsPromise = getTags().catch(() => {
      return error({
        statusCode: 404,
        message: "This page could not be found",
      });
    });
    // const [cocktailsFull, cocktails, tags] = await Promise.all([
    const [cocktailsFull, tags] = await Promise.all([
      cocktailsFullPromise,
      // cocktailsPromise,
      tagsPromise,
    ]);
    return {
      cocktailsFull: cocktailsFull.data,
      cocktails: [
        { id: 1432, name: "Тепле яблуко" },
        { id: 1433, name: "Територія Хокінга" },
        { id: 1434, name: "Том Коллінз" },
      ],
      tags: tags.data,
    };
  },
  name: "Cocktails",
  components: { CocktailsPage },
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
      const cocktails = await getСocktails(queryParams);
      this.cocktailsFull = { ...cocktails.data };
      if (payload?.loadMore) {
        this.cocktailsFull.cocktails = [
          ...items,
          ...this.cocktailsFull.cocktails,
        ];
      }
      // this.endLoading()
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  @include defaultWrapper;
}
</style>
