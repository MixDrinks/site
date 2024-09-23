<template>
    <div class="list">
        <div
            class="list__item list-item"
            v-for="(cocktail, cocktailIndex) in cocktails"
            :key="`list__item--${cocktailIndex}`"
        >
            <CocktailsCart :isLoadingLazy="!isFirstList" :cocktail="cocktail" />
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
        isFirstList: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style lang="scss" scoped>
@import './styles/cocktails-list';
</style>
