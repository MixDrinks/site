<template>
    <div :class="listClasses" class="list">
        <div
            v-for="(cocktail, cocktailIndex) in cocktails"
            :key="`item-${cocktailIndex}`"
            :class="itemClasses"
            class="list__item item"
        >
            <CocktailsCart :isLoadingLazy="!isFirstList" :cocktail="cocktail" />
        </div>
    </div>
</template>

<script>
import { defineComponent, computed, toRefs, unref } from 'vue'

import CocktailsCart from './CocktailsCart.vue'

export default defineComponent({
    name: 'CocktailsList',
    components: { CocktailsCart },
    props: {
        cocktails: {
            type: Array,
            required: true
        },
        isFirstList: {
            type: Boolean,
            default: false
        },
        modificator: {
            type: String,
            default: ''
        }
    },

    setup(props) {
        const { modificator } = toRefs(props)

        const listClasses = computed(() => ({
            [`list--${unref(modificator)}`]: Boolean(unref(modificator))
        }))
        const itemClasses = computed(() => ({
            [`item--${unref(modificator)}`]: Boolean(unref(modificator))
        }))

        return {
            itemClasses,
            listClasses
        }
    }
})
</script>

<style lang="scss" scoped>
@import './styles/cocktails-list';
</style>
