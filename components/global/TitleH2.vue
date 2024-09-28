<template>
    <h2 class="title">{{ text }}</h2>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'TitleH2',
    props: {
        text: {
            type: String,
            required: true,
        },
    },
})
</script>

<style lang="scss" scoped>
@import './styles/title-h2';
</style>
