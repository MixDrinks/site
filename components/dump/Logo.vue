<template>
  <div class="logo" v-if="isHomePage">Logo</div>
  <NuxtLink class="logo" to="/" v-else> Logo </NuxtLink>
</template>

<script>
export default {
  name: "Logo",
  computed: {
    isHomePage() {
      return this.$route.fullPath === "/";
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  width: 120px;
  height: 48px;

  background-color: $colorBlack;
  display: block;
}
</style>
