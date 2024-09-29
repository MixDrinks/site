<template>
    <div class="article">
        <TitleH2
            :text="`Коктейль ${name}: історія, рецепт та популярність`"
            class="article__title"
        />
        <div class="article__chapters article-chapters">
            <p
                v-for="(text, textIndex) in chapters"
                :key="`article-chapters__text-${textIndex}`"
                class="article-chapters__text"
            >
                {{ text }}
            </p>
        </div>
    </div>
</template>

<script>
import TitleH2 from '../global/TitleH2.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CocktailArticle',
    components: {
        TitleH2
    },

    props: {
        chapters: {
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
@import './styles/cocktail-article';
</style>
