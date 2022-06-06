<template>
  <main class="wrapper">
    <div class="" v-for="cocktail in cocktails" :key="cocktail.id">
      {{ cocktail.name }}
    </div>
  </main>
</template>

<script>
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
  name: "HomePage",
};
</script>

<style lang="scss" scoped>
.wrapper {
  @include defaultWrapper;
}
</style>
