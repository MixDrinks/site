<template>
    <p class="text">
        {{ values.text }}
    </p>
</template>

<script>
export default {
    name: 'PostText',
    props: {
        values: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
@import './styles/post-text';
</style>
