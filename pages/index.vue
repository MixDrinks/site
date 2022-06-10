<template>
  <main class="wrapper">
    <component v-if="isMobile" :is="HomePageMob" />
    <component v-else :is="HomePage" />
  </main>
</template>

<script>
export default {
  computed: {
    canonical() {
      return process.env.baseUrl + this.$nuxt.$route.path;
    },
    isMobile() {
      return this.$device.isMobile;
    },
  },
  methods: {
    HomePage: () => {
      return import("~~/components/home/HomePage.vue");
    },
    HomePageMob: () => {
      return import("~~/components/mobile/home/HomePage.vue");
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
