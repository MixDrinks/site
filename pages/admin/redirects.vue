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
  data: () => ({
    redirectList: []
  }),
  mounted() {
    this.getRedirects()
  },
  methods: {
    async getRedirects() {
      const redirectListPromise = await this.$axios.get('/admin-api/redirects', {
        auth: this.authData
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
      this.redirectList = [...redirectListPromise.items]
    }
  },
  computed: {
    authData() {
      console.log(localStorage.getItem('username'))
      return {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  @include defaultWrapper;
}
</style>
