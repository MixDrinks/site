<template>
    <h2 class="title">
        {{ values.title }}
    </h2>
</template>

<script>
export default {
    name: 'PostTitle',
    props: {
        values: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
@import './styles/post-title';
</style>
