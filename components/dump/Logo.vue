<template>
    <div class="logo" v-if="isHomePage">
        <span class="logo--highlight">mix</span>drinks
    </div>
    <NuxtLink class="logo" to="/" v-else>
        <span class="logo--highlight">mix</span>drinks
    </NuxtLink>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'nuxt/app'
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'Logo',

    setup() {
        const route = useRoute()
        const isHomePage = computed(() => route.fullPath === '/')
        return {
            isHomePage,
            route,
        }
    },
})
</script>

<style lang="scss" scoped>
@import './styles/logo';
</style>
