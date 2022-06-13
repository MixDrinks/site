<template>
  <header class="header">
    <div class="header__wrapper wrapper" ref="header">
      <Logo />
      <!-- <MainMenu /> -->
    </div>
  </header>
</template>

<script>
import MainMenu from "~~/components/dump/header/MainMenu.vue";
import Logo from "~~/components/dump/Logo.vue";
export default {
  components: { Logo, MainMenu },
  name: "Header",
  data: () => ({
    scrollVerticalvalue: null,
    isMenuShow: true,
    headerHeight: null,
  }),
  computed: {},
};
</script>

<style lang="scss" scoped>
.wrapper {
  @include defaultWrapper;
}
.header {
  background-color: $colorMain;
  &__wrapper {
    padding-top: $defaultPadding;
    padding-bottom: $defaultPadding;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
