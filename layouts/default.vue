<template>
  <div class="main">
    <Header />
    <Nuxt class="main__wrapper" />
    <Footer />
  </div>
</template>

<script>
import Footer from "~~/components/dump/footer/Footer.vue";
import Header from "~~/components/dump/header/Header.vue";
export default {
  components: { Header, Footer },
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
