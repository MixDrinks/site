<template>
    <p class="text">
        {{ values.text }}
    </p>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'PostText',
    props: {
        values: {
            type: Object,
            required: true
        }
    }
})
</script>

<style lang="scss" scoped>
@import './styles/post-text';
</style>
