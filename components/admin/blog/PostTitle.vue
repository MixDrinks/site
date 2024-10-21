<template>
    <div class="post-title">
        {{ values.title }}
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'PostTitle',
    props: {
        values: {
            type: Object,
            required: true
        }
    }
})
</script>

<style lang="scss" scoped>
@import './styles/post-title';
</style>
