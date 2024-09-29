<template>
    <div class="recipe">
        <TitleH2 :text="`Рецепт коктейлю ${name}`" class="recipe__title" />
        <ol class="recipe__list recipe-list" itemprop="recipeInstructions">
            <li
                v-for="recipeItem in receipt"
                :key="recipeItem"
                itemscope
                itemprop="step"
                itemtype="https://schema.org/HowToStep"
                class="recipe-list__item recipe-list-item"
            >
                <span itemprop="text" class="recipe-list-item__label">
                    {{ recipeItem }}
                </span>
            </li>
        </ol>
    </div>
</template>

<script>
import TitleH2 from '../global/TitleH2.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CocktailRecipe',
    components: {
        TitleH2
    },

    props: {
        receipt: {
            type: Array,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }
})
</script>

<style lang="scss" scoped>
@import './styles/cocktail-recipe';
</style>
