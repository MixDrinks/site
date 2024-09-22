<template>
    <main class="wrapper">
        <AdminLoginPage />
    </main>
</template>

<script>
import AdminLoginPage from '~~/components/admin/AdminLoginPage'

export default {
    components: {
        AdminLoginPage,
    },
    head() {
        return {
            meta: [{ name: 'robots', content: 'noindex, nofollow' }],
        }
    },
}
</script>

<style lang="scss" scoped>
.wrapper {
    @include defaultWrapper;
}
</style>
