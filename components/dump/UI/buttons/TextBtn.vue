<template>
    <NuxtLink class="btn" @click.native="click()" :to="href" v-if="!!href">
        <slot />
    </NuxtLink>
    <button class="btn" v-else @click="click()">
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
    methods: {
        click() {
            this.$emit('click')
        },
    },
}
</script>

<style lang="scss" scoped>
@import './styles/text-btn';
</style>
