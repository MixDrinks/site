<template>
  <div class="error-500 wrapper">
    {{ error }}
    <h1>500</h1>
    <p>The link you clicked on may be broken or no longer exist.</p>
  </div>
</template>
<script>
export default {
  name: "Error500",
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
