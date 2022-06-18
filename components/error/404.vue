<template>
  <div class="error-404 wrapper">
    <!-- {{ error }} -->
    <h1>404</h1>
    <p>Упс, такої сторінки не існує</p>
  </div>
</template>
<script>
export default {
  name: "Error404",
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  @include defaultWrapper;
}
</style>
