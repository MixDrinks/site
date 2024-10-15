<template>
    <div class="main">
        <Sidebar class="main__sidebar" />
        <slot />
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import Sidebar from '~~/components/admin/Sidebar.vue'

export default defineComponent({
    components: {
        Sidebar
    },

    setup() {}
})
</script>

<style lang="scss" scoped>
.main {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 250px 1fr;
    background-color: #111827;
}
</style>
