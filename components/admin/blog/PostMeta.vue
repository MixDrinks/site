<template>
    <div class="meta">
        <h2 class="text__label">Текст</h2>
        <p class="text__value">
            <!-- {{ values.text }} -->
        </p>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'PostMeta'
    // props: {
    //     values: {
    //         type: Object,
    //         required: true
    //     }
    // }
})
</script>

<style lang="scss" scoped>
@import './styles/post-meta';
</style>
