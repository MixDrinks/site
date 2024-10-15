<template>
    <div class="cocktail">
        <h2 class="cocktail__label">Коктейль</h2>
        <p class="cocktail__value">
            {{ values.name }}
        </p>
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
