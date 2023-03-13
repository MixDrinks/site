<template>
  <main class="wrapper">
    <ItemsPage 
      :cocktailsFull="cocktailsFull"
      :items="items"
      @updateCocktails="updateCocktails"
    />
  </main>
</template>

<script>
import ItemsPage from '~~/components/items/ItemsPage.vue'
import { getItems, getCocktails } from "~~/api";
export default {
  components: {
    ItemsPage
  },
  async asyncData({ route, error, query }) {
    let queryParams = "?";
    if (query && !query.page) {
      queryParams = "?page=0";
    }
    for (let [key, value] of Object.entries(query)) {
      queryParams = `${queryParams}&${key}=${value}`;
    }
    queryParams = `${queryParams}&glassware=${route.params.id}`;

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
      queryParams = `${queryParams}&glassware=${this.$nuxt.$route.params.id}`;
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
      title: `Дізнайся в яких коктейлях 🍸 використовується ${this.items.name}`,
      link: [{ rel: "canonical", href: this.canonical }],
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.items.name} використовується в представлених коктейлях 🍸 наведені рецепти та фото`,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: `Дізнайся в яких коктейлях 🍸 використовується ${this.items.name}`,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: `${this.items.name} використовується в представлених коктейлях 🍸 наведені рецепти та фото`,
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
</style>
