<template>
  <header class="header">
    <div class="header__wrapper wrapper" ref="header">
      <Logo />
      <FieldSearch />
      <!-- <MainMenu /> -->
    </div>
  </header>
</template>

<script>
import MainMenu from "~~/components/mobile/dump/header/MainMenu.vue";
import Logo from "~~/components/mobile/dump/Logo.vue";
import FieldSearch from "~~/components/mobile/dump/UI/FieldSearch.vue";
export default {
  components: { Logo, MainMenu, FieldSearch },
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
  overflow: visible;
}
.header {
  background-color: $colorMain;
  &__wrapper {
    padding-top: $halfPadding;
    padding-bottom: $halfPadding;
  }
}
</style>
