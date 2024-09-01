<template>
    <div class="logo" v-if="isHomePage">
        <span class="logo--highlight">mix</span>drinks
    </div>
    <NuxtLink class="logo" to="/" v-else>
        <span class="logo--highlight">mix</span>drinks
    </NuxtLink>
</template>

<script>
export default {
    name: 'Logo',
    computed: {
        isHomePage() {
            return this.$route.fullPath === '/'
        },
    },
}
</script>

<style lang="scss" scoped>
@import './styles/logo';
</style>
