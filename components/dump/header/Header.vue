<template>
  <header class="header">
    <div class="header__wrapper wrapper" ref="header">
      <Logo />
      <FieldSearch class="header__search" />
      <!-- <MainMenu /> -->
    </div>
  </header>
</template>

<script>
import MainMenu from "~~/components/dump/header/MainMenu.vue";
import Logo from "~~/components/dump/Logo.vue";
import FieldSearch from "~~/components/dump/UI/FieldSearch.vue";
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
    padding-top: $defaultPadding;
    padding-bottom: $defaultPadding;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__search {
    width: 400px;
  }
}
</style>
