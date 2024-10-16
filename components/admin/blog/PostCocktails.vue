<template>
    <div class="cocktails">
        <div
            v-for="(cocktail, cocktailIndex) in values"
            :key="`cocktail__value-${cocktailIndex}`"
            class="cocktails__value"
        >
            {{ cocktail.name }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'PostCocktails',
    props: {
        values: {
            type: Array,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
@import './styles/post-cocktails';
</style>
