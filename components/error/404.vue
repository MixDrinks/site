<template>
    <div class="error">
        <h1>404</h1>
        <p>Упс, такої сторінки не існує</p>
    </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Error404',
    props: {
        error: {
            type: Object,
            default: () => {}
        }
    }
})
</script>
<style lang="scss" scoped>
@import './styles/404';
</style>
