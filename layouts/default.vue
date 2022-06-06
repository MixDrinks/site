<template>
  <div>
    <Header />
    <Nuxt />
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

<style lang="scss" scoped></style>
