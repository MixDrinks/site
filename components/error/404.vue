<template>
  <div class="error-404 wrapper">
    {{ error }}
    <h1>404</h1>
    <p>The link you clicked on may be broken or no longer exist.</p>
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
