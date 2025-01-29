<template>
    <div v-if="isHomePage" class="logo">
        <span class="logo--highlight">mix</span>drinks
    </div>
    <NuxtLink v-else prefetchOn="interaction" class="logo" to="/">
        <span class="logo--highlight">mix</span>drinks
    </Nuxtlink>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useRoute } from 'nuxt/app'

export default defineComponent({
    name: 'Logo',

    setup() {
        const route = useRoute()
        const isHomePage = computed(() => route.fullPath === '/')
        return {
            isHomePage,
            route
        }
    }
})
</script>

<style lang="scss" scoped>
@import './styles/logo';
</style>
