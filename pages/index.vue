<template>
  <main class="wrapper">
    <HomePage class="home-page" :cocktails="cocktails" />
  </main>
</template>

<script>
import HomePage from "~~/components/home/HomePage.vue";
import { getСocktails } from "~~/api";
export default {
  async asyncData({ error }) {
    const cocktails = await getСocktails().catch(() => {
      return error({
        statusCode: 404,
        message: "This page could not be found",
      });
    });
    return {
      cocktails: cocktails.data,
    };
  },
  name: "Home",
  components: { HomePage },
};
</script>

<style lang="scss" scoped>
.wrapper {
  @include defaultWrapper;
}
.home-page {
  margin: $halfMargin 0;
}
</style>
