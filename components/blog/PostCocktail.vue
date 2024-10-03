<template>
    <div class="cocktail">
        <picture class="cocktail__picture">
            <source
                v-for="img in values.images"
                :key="img.id"
                :srcset="img.srcset"
                :media="img.media"
                :type="img.type"
            />
            <img
                :alt="`Зображення коктейля ${values.name}`"
                class="cocktail__img"
                width="298"
                height="298"
                title=""
            />
        </picture>
        <div class="cocktail__info info">
            <CocktailTags :tags="values.tags" class="info__tags" />
            <CocktailItems
                :title="`Склад коктейлю ${values.name}`"
                :items="values.goods"
                size="m"
            />
        </div>
    </div>
</template>

<script>
import CocktailItems from '../cocktail/CocktailItems.vue'
import CocktailTags from '../cocktail/CocktailTags.vue'
export default {
    name: 'PostCocktail',
    components: { CocktailTags, CocktailItems },
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
