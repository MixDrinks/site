<template>
  <div class="main">
    <component v-if="isMobile" :is="HeaderMob" />
    <component v-else :is="Header" />
    <Header />
    <Nuxt class="main__wrapper" />
    <component v-if="isMobile" :is="FooterMob" />
    <component v-else :is="Footer" />
  </div>
</template>

<script>
export default {
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
  methods: {
    Header: () => {
      return import("~~/components/dump/header/Header.vue");
    },
    HeaderMob: () => {
      return import("~~/components/mobile/dump/header/Header.vue");
    },
    Footer: () => {
      return import("~~/components/dump/footer/Footer.vue");
    },
    FooterMob: () => {
      return import("~~/components/mobile/dump/footer/Footer.vue");
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  &__wrapper {
    flex: 1 1 auto;
  }
  @media (min-width: 768px) {
    &__wrapper {
      margin-top: $shortMargin;
      margin-bottom: $shortMargin;
    }
  }
  @media (max-width: 767px) {
    &__wrapper {
      margin-top: $halfShortMargin;
      margin-bottom: $halfShortMargin;
    }
  }
}
</style>
