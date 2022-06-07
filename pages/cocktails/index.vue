<template>
  <main class="wrapper">
    <CocktailsPage :cocktails="cocktails" :tags="tags" />
  </main>
</template>

<script>
import CocktailsPage from "~~/components/cocktails/CocktailsPage.vue";
import { getСocktailsShort, getTags } from "~~/api";
export default {
  async asyncData({ error }) {
    const tags = await getTags().catch(() => {
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
    return {
      cocktails: cocktails.data,
      tags: tags.data,
    };
  },
  name: "Cocktails",
  components: { CocktailsPage },
};
</script>

<style lang="scss" scoped>
.wrapper {
  @include defaultWrapper;
}
</style>
