<template>
  <main class="wrapper">
    <HomePage class="home-page" />
  </main>
</template>

<script>
import HomePage from "~~/components/home/HomePage.vue";
export default {
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
