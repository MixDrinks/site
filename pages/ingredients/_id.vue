<template>
  <main class="wrapper">
    <div class="display">&nbsp;</div>
    <ItemsPage :items="items" />
  </main>
</template>

<script>
import ItemsPage from "~~/components/items/ItemsPage.vue";
import { getItems } from "~~/api";
export default {
  async asyncData({ route, error }) {
    const items = await getItems(`?id=${route.params.id}`).catch(() => {
      return error({
        statusCode: 404,
        message: "This page could not be found",
      });
    });
    return {
      items: items.data,
    };
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
  components: { ItemsPage },
  name: "Item",
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
