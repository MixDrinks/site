<template>
  <main class="wrapper">
    <AdminLoginPage></AdminLoginPage>
  </main>
</template>

<script>

import AdminLoginPage from "~/components/admin/AdminLoginPage.vue";

export default {
  components: {
    AdminLoginPage,
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  @include defaultWrapper;
}
</style>
