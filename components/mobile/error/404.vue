<template>
  <div class="error-404 wrapper">
    <h1>{{ error.statusCode }}</h1>
    <p>{{ error.message }}</p>
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
