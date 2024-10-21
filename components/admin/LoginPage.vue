<template>
    <div class="login">
        <div class="login__header">
            <h1 class="login__title">Login</h1>
        </div>
        <form @submit.prevent="handleLogin" class="login__form">
            <div class="login__input-group">
                <label for="username" class="login__label">Username</label>
                <input
                    id="username"
                    v-model="username"
                    required
                    type="username"
                    placeholder="Enter your username"
                    class="login__input"
                />
            </div>
            <div class="login__input-group">
                <label for="password" class="login__label">Password</label>
                <input
                    id="password"
                    v-model="password"
                    required
                    type="password"
                    placeholder="Enter your password"
                    class="login__input"
                />
            </div>
            <button type="submit" class="login__submit">Login</button>
        </form>
    </div>
</template>

<script>
import { useFetch } from 'nuxt/app'

export default {
    name: 'LoginPage',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        async handleLogin() {
            try {
                const { error } = await useFetch('/api/login', {
                    method: 'POST',
                    body: { username: this.username, password: this.password },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if (error.value) {
                    this.errorMessage =
                        'Invalid login credentials. Please try again.'
                    return
                }

                // Redirect to another page or store user data, etc.
            } catch (err) {
                this.errorMessage =
                    'Something went wrong. Please try again later.'
                console.error(err)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.login {
    &__header {
        margin-bottom: $shortMargin;
        text-align: center;
    }

    &__title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: $halfShortMargin;
    }

    &__form {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid rgb(231, 226, 222);
        border-radius: 8px;
        background-color: #fff;
    }

    &__input-group {
        margin-bottom: $halfShortMargin;

        @media (min-width: 1023px) {
            margin-bottom: $shortMargin;
        }
    }

    &__label {
        display: block;
        font-weight: bold;
        margin-bottom: 8px;
    }

    &__input {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    &__submit {
        width: 100%;
        padding: 12px;
        background-color: $colorMain;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 18px;
        font-weight: bold;
        transition: background-color $defaultAnimTime;

        &:hover {
            background-color: $colorHover;
        }
    }
}
</style>
