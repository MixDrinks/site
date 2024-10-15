<template>
    <div class="title">
        <h2 class="title__label">Заголовок H2</h2>
        <p class="title__value">
            {{ values.title }}
        </p>
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
