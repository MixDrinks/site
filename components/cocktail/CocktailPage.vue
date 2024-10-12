<template>
    <div class="cocktail">
        <div
            :itemscope="!!cocktail.rating"
            :itemtype="!!cocktail.rating ? `http://schema.org/Product` : false"
            class="cocktail-header"
        >
            <h1 itemprop="name" class="cocktail-header__title">
                {{ cocktail.name }}
            </h1>
            <div class="cocktail-header-statistics">
                <div
                    v-if="!!cocktail.visitCount"
                    class="cocktail-header-statistics__views"
                >
                    Переглядів <strong>{{ cocktail.visitCount }}</strong>
                </div>
                <CocktailRating
                    :id="cocktail.id"
                    :slug="cocktail.slug"
                    :ratingCount="cocktail.ratingCount"
                    :ratingValue="cocktail.rating"
                />
            </div>
        </div>
        <CocktailTags :tags="cocktail.tags" class="cocktail__tags" />
        <div class="cocktail__body cocktail-body">
            <picture class="cocktail-body__picture">
                <source
                    v-for="img in cocktail.images"
                    :key="img.id"
                    :srcset="img.srcset"
                    :media="img.media"
                    :type="img.type"
                />
                <img
                    :alt="`Зображення коктейля ${cocktail.name}`"
                    :title="cocktail.name"
                    width="332"
                    height="208"
                    class="cocktail-body__img"
                />
            </picture>
            <CocktailRecipe
                :name="cocktail.name"
                :receipt="cocktail.receipt"
                class="cocktail-body__recipe"
            />
            <div class="cocktail-body__ads">
                <Advertising />
            </div>
            <Separator />
            <CocktailItems
                :title="`Склад коктейлю ${cocktail.name}`"
                :items="cocktail.goods"
                withCounter
                class="cocktail-body__goods"
            />
            <Separator />
            <CocktailItems
                :title="`Потрібні штучки для приготування ${cocktail.name}`"
                :items="cocktail.tools"
                class="cocktail-body__tools"
            />
            <Separator />
            <CocktailRecomendation
                v-if="cocktail.recomendationCocktails"
                :cocktails="cocktail.recomendationCocktails"
                class="cocktail-body__recomendation"
            />
            <Separator />
            <CocktailArticle
                v-if="cocktail.article"
                :name="cocktail.name"
                :chapters="cocktail.article.chapters"
                class="cocktail-body__article"
            />
        </div>
    </div>
</template>

<script>
import CocktailRating from '../cocktail/CocktailRating.vue'
import CocktailItems from '../cocktail//CocktailItems.vue'
import CocktailRecomendation from '../cocktail/CocktailRecomendation.vue'
import Separator from '../global/Separator.vue'
import CocktailRecipe from './CocktailRecipe.vue'
import CocktailArticle from './CocktailArticle.vue'
import CocktailTags from './CocktailTags.vue'
import Advertising from '../global/Advertising.vue'

import { onBeforeUnmount, toRefs, defineComponent, unref } from 'vue'
import { head } from '~~/utils/head'
import { schemaRecipe } from '~~/utils/schemaRecipe'
import { updateVisit } from '~~/api/other'

export default defineComponent({
    name: 'CocktailPage',
    components: {
        CocktailRating,
        CocktailItems,
        CocktailRecomendation,
        Separator,
        CocktailRecipe,
        CocktailArticle,
        CocktailTags,
        Advertising
    },
    props: {
        cocktail: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const { cocktail } = toRefs(props)

        onBeforeUnmount(() => {
            updateVisit(unref(cocktail).slug)
        })

        const headTitle = `Коктейль ${unref(cocktail).name} 🍹 приготування в домашніх умовах за рецептом`
        const headDescription = `Як приготувати коктейль ${unref(cocktail).name} 🍹 в домашніх умовах, вcі інгрідієнти які вам потрібні та рецепт для коктейля наведені на cторінці!`

        const scripts = [
            {
                async: true,
                type: 'application/ld+json',
                children: schemaRecipe(unref(cocktail), headDescription)
            }
        ]

        head({
            title: headTitle,
            description: headDescription,
            indexPage: true,
            scripts: scripts,
            image: unref(cocktail).meta.ogImage
        })
    }
})
</script>

<style lang="scss" scoped>
@import './styles/cocktail-page';
</style>
