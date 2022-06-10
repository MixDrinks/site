<template>
  <main class="wrapper">
    <div class="display">&nbsp;</div>
    <ItemsPage
      :cocktailsFull="cocktailsFull"
      :items="items"
      @updateCocktails="updateCocktails"
    />
  </main>
</template>

<script>
import ItemsPage from "~~/components/items/ItemsPage.vue";
import { getItems, getCocktails } from "~~/api";
export default {
  async asyncData({ route, error, query }) {
    let queryParams = "?";
    if (query && !query.page) {
      queryParams = "?page=0";
    }
    for (let [key, value] of Object.entries(query)) {
      queryParams = `${queryParams}&${key}=${value}`;
    }
    queryParams = `${queryParams}&items=${route.params.id}`;

    const itemsPromise = getItems(`?id=${route.params.id}`).catch(() => {
      return error({
        statusCode: 404,
        message: "This page could not be found",
      });
    });
    const cocktailsFullPromise = getCocktails(queryParams).catch(() => {
      return error({
        statusCode: 404,
        message: "This page could not be found",
      });
    });
    const [cocktailsFull, items] = await Promise.all([
      cocktailsFullPromise,
      itemsPromise,
    ]);
    return {
      cocktailsFull: cocktailsFull.data,
      items: items.data,
    };
  },
  components: { ItemsPage },
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
      queryParams = `${queryParams}&items=${this.$nuxt.$route.params.id}`;
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
  head() {
    return {
      title: `${this.items.name} використовується в приготувані коктейлів`,
      link: [{ rel: "canonical", href: this.canonical }],
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.items.name} історія та в яких коктейлях можна використати`,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: `${this.items.name} використовується в приготувані коктейлів`,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: `${this.items.name} історія та в яких коктейлях можна використати`,
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
.display {
  display: none;
}
</style>
