<template>
    <NuxtLink v-if="!!href" :to="href" prefetchOn="interaction" class="btn">
        <slot />
    </Nuxtlink>
    <button v-else class="btn">
        <slot />
    </button>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'TextBtn',
    props: {
        href: {
            type: String,
            default: ''
        }
    }
})
</script>

<style lang="scss" scoped>
@import './styles/text-btn';
</style>
