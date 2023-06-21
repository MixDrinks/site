<template>
  <main class="wrapper">
    <RedirectListPage></RedirectListPage>
  </main>
</template>

<script>

import RedirectListPage from "~/components/admin/RedirectListPage";

export default {
  components: {
    RedirectListPage,
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  @include defaultWrapper;
}
</style>
