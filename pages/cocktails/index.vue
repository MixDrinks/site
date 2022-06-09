<template>
  <main class="wrapper">
    <div>&nbsp;</div>
    <CocktailsPage
      :cocktailsFull="cocktailsFull"
      :cocktailsShort="cocktailsShort"
      :tags="tags"
      @updateCocktails="updateCocktails"
    />
  </main>
</template>

<script>
import CocktailsPage from "~~/components/cocktails/CocktailsPage.vue";
import { getCocktailsShort, getTags, getCocktails } from "~~/api";
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
    const cocktailsPromise = getCocktailsShort().catch(() => {
      return error({
        statusCode: 404,
        message: "This page could not be found",
      });
    });
    const tagsPromise = getTags().catch(() => {
      return error({
        statusCode: 404,
        message: "This page could not be found",
      });
    });
    const [cocktailsFull, cocktailsShort, tags] = await Promise.all([
      cocktailsFullPromise,
      cocktailsPromise,
      tagsPromise,
    ]);
    return {
      cocktailsFull: cocktailsFull.data,
      cocktailsShort: cocktailsShort.data,
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
  },
  computed: {
    canonical() {
      return process.env.baseUrl + this.$nuxt.$route.path;
    },
  },
  head() {
    return {
      title: "Категорія коктейлів",
      link: [{ rel: "canonical", href: this.canonical }],
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Короткий опис категорія коктейлів",
        },
        {
          hid: "og:title",
          name: "og:title",
          content: "Категорія коктейлів",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "Короткий опис категорія коктейлів",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: `${this.canonical}`,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  @include defaultWrapper;
}
</style>
