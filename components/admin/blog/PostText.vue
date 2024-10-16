<template>
    <div class="text">
        {{ values.text }}
    </div>
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
