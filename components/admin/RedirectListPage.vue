<template>
  <div>
    <h1>Redirect page</h1>
  </div>
</template>

<script>
import * as $store from "~/store/auth";

export default {
  async asyncData({error, $axios}) {
    const {username, password} = $store.state.auth
    await $axios.get('/admin-api/redirects', {
      auth: {
        username: username,
        password: password
      }
    })
        .then((response) => {
          console.log(response.data)
          const items = response.data
          return { items }
        })
        .catch((error) => {
          console.log(error)
          return { items: [] }
        });
  }
}
</script>

<style scoped lang="scss">

</style>