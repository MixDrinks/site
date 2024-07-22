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
}
</script>

<style lang="scss" scoped>
.wrapper {
    @include defaultWrapper;
}
</style>
