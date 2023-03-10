<template>
  <div class="logo" v-if="isHomePage">MIXdrinks</div>
  <NuxtLink class="logo" to="/" v-else> MIXdrinks </NuxtLink>
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
@import './styles/logo'
</style>
