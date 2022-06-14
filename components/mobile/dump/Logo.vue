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
.logo {
  font-family: cursive;
  @include fontSize24B;
  color: $colorWhite;

  padding: 8px 15px 8px 0;

  display: block;
}
</style>
