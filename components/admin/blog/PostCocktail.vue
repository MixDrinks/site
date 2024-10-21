<template>
    <div class="cocktail">
        {{ values.name }}
    </div>
</template>

<script>
export default {
    name: 'PostCocktail',
    props: {
        values: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
@import './styles/post-cocktail';
</style>
