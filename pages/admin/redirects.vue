<template>
  <main class="wrapper">
    <RedirectListPage
        :redirectList="redirectList"
    />
  </main>
</template>

<script>

import RedirectListPage from "~/components/admin/RedirectListPage";

export default {
  components: {
    RedirectListPage,
  },
  async asyncData({route, error, query, $axios}) {
    const redirectListPromise = await $axios.get('/admin-api/redirects', {
      auth: {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password')
      }
    })
        .then((response) => {
          console.log(response.data)
          const items = response.data
          return {items}
        })
        .catch((error) => {
          console.log(error)
          return {items: []}
        });
    return {
      redirectList: redirectListPromise.items
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  @include defaultWrapper;
}
</style>
