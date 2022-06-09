<template>
  <main class="wrapper">
    <CocktailPage :cocktail="cocktail" />
  </main>
</template>

<script>
import CocktailPage from "~~/components/cocktails/CocktailPage.vue";
import { getCocktail } from "~~/api";
export default {
  async asyncData({ route, error }) {
    const cocktail = await getCocktail(`?id=${route.params.id}`).catch(() => {
      return error({
        statusCode: 404,
        message: "This page could not be found",
      });
    });
    return {
      cocktail: cocktail.data,
    };
  },
  components: { CocktailPage },
  name: "Cocktails",
};
</script>

<style lang="scss" scoped></style>
