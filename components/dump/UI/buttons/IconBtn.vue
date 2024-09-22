<template>
    <NuxtLink
        :class="btnClasses"
        @click.native="click()"
        :to="href"
        v-if="!!href"
        class="btn"
    >
        <span
            class="btn__icon"
            :style="`mask-image: url(${icon}); -webkit-mask-image: url(${icon})`"
        ></span>
        <slot />
    </NuxtLink>
    <button :class="btnClasses" v-else @click="click()" class="btn">
        <span
            class="btn__icon"
            :style="`mask-image: url(${icon}); -webkit-mask-image: url(${icon})`"
        ></span>
        <slot />
    </button>
</template>

<script>
export default {
    name: 'IconBtn',
    props: {
        href: {
            type: String,
            default: '',
        },
        lock: {
            type: Boolean,
            default: false,
        },
        direction: {
            type: String,
            default: 'top',
        },
        icon: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: 'big',
        },
    },
    methods: {
        click() {
            this.$emit('click')
        },
    },
    computed: {
        btnClasses() {
            return [
                { 'btn--lock': this.lock },
                `btn--${this.direction}`,
                `btn--${this.type}`,
            ]
        },
    },
}
</script>

<style lang="scss" scoped>
@import './styles/icon-btn';
</style>
