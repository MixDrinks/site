<template>
    <div class="recomendation">
        <TitleH2 class="recomendation__title" text="Рекомендуємо спробувати" />
        <ul class="recomendation__list list">
            <li
                v-for="(cocktail, cocktailIndex) in cocktails"
                :key="`list__item-${cocktailIndex}`"
                class="list__item"
            >
                <div class="cart">
                    <div
                        v-if="!!cocktail.rating || !!cocktail.visitCount"
                        class="cart__header cart-header"
                    >
                        <div
                            v-if="!!cocktail.rating"
                            class="cart-header__rating cart-header-rating"
                        >
                            {{ getRating(cocktail.rating) }}
                        </div>
                        <div
                            v-if="!!cocktail.visitCount"
                            class="cart-header__visit-count cart-header-visit-count"
                        >
                            {{ cocktail.visitCount }}
                        </div>
                    </div>
                    <picture class="cart__picture">
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
                            class="cart__img"
                            width="120"
                            height="120"
                            loading="lazy"
                        />
                    </picture>
                    <Nuxtlink
                        :to="`/${pages.cocktail.slug}/${cocktail.slug}`"
                        prefetchOn="interaction"
                        class="cart__name"
                    >
                        {{ cocktail.name }}
                    </Nuxtlink>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import TitleH2 from '../global/TitleH2.vue'

import { defineComponent } from 'vue'
import { pages } from '../../utils/pages'

export default defineComponent({
    name: 'CocktailRecomendation',
    components: { TitleH2 },
    props: {
        cocktails: {
            type: Array,
            required: true
        }
    },
    setup() {
        const getRating = (value) => Number(value.toFixed(1))

        return {
            getRating,
            pages
        }
    }
})
</script>
<style lang="scss" scoped>
@import './styles/cocktail-recomendation';
</style>
