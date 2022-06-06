<template>
  <footer class="footer">
    <div class="wrapper">
      <div class="footer__wrapper"></div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss" scoped>
.wrapper {
  @include defaultWrapper;
}
.footer {
  &__wrapper {
    padding: $defaultPadding 0;
  }
  background-color: $colorMain;
}
</style>
