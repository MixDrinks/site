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
    const cocktailsFull = await getСocktails(queryParams).catch(() => {
      return error({
        statusCode: 404,
        message: "This page could not be found",
      });
    });
    const cocktails = await getСocktailsShort().catch(() => {
      return error({
        statusCode: 404,
        message: "This page could not be found",
      });
    });
    const tags = await getTags().catch(() => {
      return error({
        statusCode: 404,
        message: "This page could not be found",
      });
    });
    return {
      cocktailsFull: cocktailsFull.data,
      cocktails: cocktails.data,
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
