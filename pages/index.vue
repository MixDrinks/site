<template>
  <main class="wrapper">
    <HomePage />
  </main>
</template>

<script>
import HomePage from "~~/components/home/HomePage.vue";
export default {
  name: "Home",
  components: { HomePage },
  computed: {
    canonical() {
      return process.env.baseUrl + this.$nuxt.$route.path;
    },
  },
  head() {
    return {
      title: "Головна сторінка коктейлів",
      link: [{ rel: "canonical", href: this.canonical }],
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Короткий опис головна сторінка коктейлів",
        },
        {
          hid: "og:title",
          name: "og:title",
          content: "Головна сторінка коктейлів",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "Короткий опис головна сторінка коктейлів",
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
