<template>
  <div class="login-form">
    <form @submit.prevent="login">
      <div class="input-field">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="input-field">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div class="submit-button">
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>
<script>

export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async login() {
      await this.$axios.$get('/admin', {
        auth: {
          username: this.username,
          password: this.password
        }
      }).then((response) => {
        this.$store.commit('auth/setUsername', this.username)
        this.$store.commit('auth/setPassword', this.password)

        this.$router.push('/admin/redirects')
        console.log(response)
      }).catch((error) => {
        if (error.response.status === 401) {
          alert('Incorrect username or password')
        } else {
          console.log(error)
        }
      })
    }
  },
};
</script>
<style lang="scss" scoped>
@import "./styles/admin-login";
</style>