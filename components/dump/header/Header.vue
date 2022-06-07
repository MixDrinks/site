<template>
  <header class="header">
    <div class="header__wrapper" :class="{ show: isMenuShow }" ref="header">
      <div class="wrapper header__flex">
        <Logo />
        <MainMenu />
      </div>
    </div>
    <div class="header__spacer" :style="`height: ${headerHeight}px;`"></div>
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
  methods: {
    handleScroll() {
      this.isMenuShow = this.scrollVerticalvalue > window.scrollY;
      this.scrollVerticalvalue = window.scrollY;
    },
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  mounted() {
    this.headerHeight = this.$refs.header.offsetHeight;
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  @include defaultWrapper;
}
.header {
  &__wrapper {
    z-index: 100;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    background-color: $colorMain;
    padding-top: $defaultPadding;
    padding-bottom: $defaultPadding;

    &:not(.show) {
      transform: translateY(-100%);
    }

    transition: transform $defaultAnimTime linear;
  }
  &__flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
