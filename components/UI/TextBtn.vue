<template>
    <NuxtLink class="btn" :to="href" v-if="!!href">
        <slot />
    </NuxtLink>
    <button class="btn" v-else>
        <slot />
    </button>
</template>

<script>
export default {
    name: 'TextBtn',
    props: {
        href: {
            type: String,
            default: '',
        },
    },
}
</script>

<style lang="scss" scoped>
@import './styles/text-btn';
</style>
