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
};
</script>

<style lang="scss" scoped>
.wrapper {
  @include defaultWrapper;
}
</style>
