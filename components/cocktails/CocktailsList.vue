<template>
    <div class="list">
        <div
            class="list__item list-item"
            v-for="cocktail in cocktails"
            :key="cocktail.id"
            data-cy="cocktailCard"
        >
            <CocktailsCart :cocktail="cocktail" />
        </div>
    </div>
</template>

<script>
import CocktailsCart from './CocktailsCart.vue'
export default {
    name: 'CocktailsList',
    components: { CocktailsCart },
    props: {
        cocktails: {
            type: Array,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped>
@import './styles/cocktails-list';
</style>
