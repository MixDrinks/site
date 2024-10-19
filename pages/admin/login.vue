<template>
  <main class="wrapper">
    <LoginPage />
  </main>
</template>

<script>
import { defineComponent } from 'vue'
import { useHead } from 'nuxt/app'

import LoginPage from '~~/components/admin/LoginPage.vue'

export default defineComponent({
  name: 'LoginPageWrapper',
  components: { LoginPage },

  setup() {
    // Optionally, you can set meta tags or SEO related content.
    useHead({
      meta: [{ name: 'robots', content: 'noindex, nofollow' }]
    })

    return {}
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  @include defaultWrapper;
}
</style>
