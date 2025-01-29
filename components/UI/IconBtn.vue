<template>
    <Nuxtlink
        v-if="!!href"
        :class="btnClasses"
        :to="href"
        prefetchOn="interaction"
        class="btn"
    >
        <span
            :style="`mask-image: url(${icon}); -webkit-mask-image: url(${icon})`"
            class="btn__icon"
        />
        <slot />
    </Nuxtlink>
    <button v-else :class="btnClasses" class="btn">
        <span
            :style="`mask-image: url(${icon}); -webkit-mask-image: url(${icon})`"
            class="btn__icon"
        />
        <slot />
    </button>
</template>

<script>
import { computed, defineComponent, toRefs, unref } from 'vue'

export default defineComponent({
    name: 'IconBtn',
    props: {
        href: {
            type: String,
            default: ''
        },
        lock: {
            type: Boolean,
            default: false
        },
        direction: {
            type: String,
            default: 'top'
        },
        icon: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'big'
        }
    },
    setup(props) {
        const { lock, direction, type } = toRefs(props)
        const btnClasses = computed(() => [
            { 'btn--lock': unref(lock) },
            `btn--${unref(direction)}`,
            `btn--${unref(type)}`
        ])

        return {
            btnClasses
        }
    }
})
</script>

<style lang="scss" scoped>
@import './styles/icon-btn';
</style>
