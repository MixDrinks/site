<template>
    <div class="cocktail">
        <div
            :itemscope="!!cocktail.rating"
            :itemtype="!!cocktail.rating ? `http://schema.org/Product` : false"
            class="cocktail__header cocktail-header"
        >
            <h1 class="cocktail-header-title cocktail-header__title">
                <span itemprop="name" class="cocktail-header-title__label">
                    {{ cocktail.name }}
                </span>
            </h1>
            <div class="cocktail-header__user-info cocktail-header-user-info">
                <div
                    class="cocktail-header-user-info__views"
                    v-if="!!cocktail.visitCount"
                >
                    Переглядів <strong>{{ cocktail.visitCount }}</strong>
                </div>
                <Rating
                    class="cocktail-header-user-info__rating"
                    :slug="cocktail.slug"
                    :id="cocktail.id"
                    :ratingCount="cocktail.ratingCount"
                    :ratingValue="cocktail.rating"
                />
            </div>
        </div>
        <ul class="cocktail__tags cocktail-tags">
            <li
                class="cocktail-tags__item cocktail-tags-item"
                v-for="tag in cocktail.tags"
                :key="tag.id"
            >
                <NuxtLink
                    :to="`/${tag.url}`"
                    class="cocktail-tags-item__link cocktail-tags-item-link"
                >
                    <span class="cocktail-tags-item-link__label">{{
                        tag.name
                    }}</span>
                </NuxtLink>
            </li>
        </ul>
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
                    class="cocktail-body__img"
                    width="332"
                    height="208"
                    :alt="`Зображення коктейля ${cocktail.name}`"
                    title=""
                />
            </picture>
            <div class="cocktail-body__recipe cocktail-body-recipe">
                <h2
                    class="cocktail-body-recipe__title cocktail-body-recipe-title"
                >
                    <span class="cocktail-body-recipe-title__label">
                        Рецепт коктейлю {{ cocktail.name }}
                    </span>
                </h2>
                <ol
                    class="cocktail-body-recipe__list cocktail-body-recipe-list"
                    itemprop="recipeInstructions"
                >
                    <li
                        itemprop="step"
                        itemscope
                        itemtype="https://schema.org/HowToStep"
                        class="cocktail-body-recipe-list__item cocktail-body-recipe-list-item"
                        v-for="recipeItem in cocktail.receipt"
                        :key="recipeItem"
                    >
                        <span
                            itemprop="text"
                            class="cocktail-body-recipe-list-item__label"
                        >
                            {{ recipeItem }}
                        </span>
                    </li>
                </ol>
            </div>
            <div class="cocktail-body__ads">
                <ins
                    class="adsbygoogle"
                    style="display: block"
                    data-ad-format="fluid"
                    data-ad-layout-key="-gh-4+1q-51+45"
                    data-ad-client="ca-pub-9033785625371866"
                    data-ad-slot="2682031593"
                ></ins>
            </div>
            <CocktailComponents
                class="cocktail-body__goods"
                :title="`Склад коктейлю ${cocktail.name}`"
                :components="cocktail.goods"
                withCounter
            />
            <CocktailComponents
                class="cocktail-body__tools"
                :title="`Потрібні штучки для приготування ${cocktail.name}`"
                :components="cocktail.tools"
            />
            <CocktailRecomendation
                v-if="cocktail.recomendationCocktails"
                class="cocktail-body__recomendation"
                :cocktails="cocktail.recomendationCocktails"
            />
            <div
                v-if="cocktail.article"
                class="cocktail-body__article cocktail-body-article"
            >
                <h2 class="cocktail-body-article__title">
                    Коктейль {{ cocktail.name }}: історія, рецепт та
                    популярність
                </h2>
                <div
                    v-if="cocktail.article.chapters"
                    class="cocktail-body-article__chapters cocktail-body-article-chapters"
                >
                    <p
                        v-for="(text, textIndex) in cocktail.article.chapters"
                        :key="`cocktail-body-article-chapters__text-${textIndex}`"
                        class="cocktail-body-article-chapters__text"
                    >
                        {{ text }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Rating from './Rating.vue'
import IconBtn from './../UI/IconBtn.vue'
import CocktailComponents from './CocktailComponents.vue'
import CocktailRecomendation from './CocktailRecomendation.vue'
import { onBeforeUnmount, toRefs, defineComponent, unref } from 'vue'
import { head } from '~~/utils/head'
import { schemaRecipe } from '~~/utils/schemaRecipe'

export default defineComponent({
    name: 'CocktailPage',
    components: { IconBtn, Rating, CocktailComponents, CocktailRecomendation },
    props: {
        cocktail: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const { cocktail } = toRefs(props)
        async function updateVisit() {
            return await $fetch(
                `https://newapi.mixdrinks.org/api/cocktail/${
                    unref(cocktail).slug
                }/visit`,
                {
                    method: 'POST',
                }
            )
        }

        onBeforeUnmount(() => {
            updateVisit()
        })

        const headTitle = `Коктейль ${
            unref(cocktail).name
        } 🍹 приготування в домашніх умовах за рецептом`
        const headDescription = `Як приготувати коктейль ${
            unref(cocktail).name
        } 🍹 в домашніх умовах, всі інгрідієнти які вам потрібні та рецепт для коктейля наведені на сторінці!`

        const scripts = [
            {
                type: 'application/ld+json',
                children: schemaRecipe(unref(cocktail), headDescription),
            },
            {
                async: true,
                src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9033785625371866',
                crossorigin: 'anonymous',
            },
            {
                innerHTML: `;(adsbygoogle = window.adsbygoogle || []).push({})`,
            },
        ]

        head({
            title: headTitle,
            description: headDescription,
            indexPage: true,
            scripts: scripts,
            image: unref(cocktail).meta.ogImage,
        })
    },
})
</script>

<style lang="scss" scoped>
@import './styles/cocktail-page';
</style>
