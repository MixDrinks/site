<template>
    <div class="login">
        <form @submit.prevent="login" class="login__form login-form">
            <label class="input login-form__input">
                <span class="input__label">Username:</span>
                <input
                    class="input__field"
                    type="text"
                    v-model="username"
                    required
                />
            </label>

            <label class="input login-form__input">
                <span class="input__label">Password:</span>
                <input
                    class="input__field"
                    type="text"
                    v-model="password"
                    required
                />
            </label>

            <button class="submit login-form__submit" type="submit">
                Login
            </button>
        </form>
    </div>
</template>
<script>
export default {
    data: () => {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        login() {
            this.$axios
                .$get('admin-api/admin', {
                    auth: {
                        username: this.username,
                        password: this.password,
                    },
                })
                .then((response) => {
                    localStorage.setItem('username', this.username)
                    localStorage.setItem('password', this.password)

                    this.$router.push('/admin/redirects')
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                    if (error.response.status === 401) {
                        alert('Incorrect username or password')
                    }
                })
        },
    },
}
</script>
<style lang="scss" scoped>
@import './styles/admin-login';
</style>