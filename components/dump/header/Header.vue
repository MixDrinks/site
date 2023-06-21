<template>
  <header class="header">
    <div class="header__content header-content" ref="header">
      <Logo />
      <FieldSearch class="header-content__search" />
    </div>
  </header>
</template>

<script>
import Logo from "~~/components/dump/Logo";
import FieldSearch from "~~/components/dump/UI/FieldSearch";
export default {
  components: { Logo, FieldSearch },
  name: "Header",
  data: () => ({
    scrollVerticalvalue: null,
    isMenuShow: true,
    headerHeight: null,
  }),
};
</script>

<style lang="scss" scoped>
@import './styles/header'
</style>
