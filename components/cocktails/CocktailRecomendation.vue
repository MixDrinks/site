<template>
    <div class="recomendation">
        <TitleH2
            class="recomendation__title"
            text="Рекомендуємо спробувати"
        ></TitleH2>
        <ul class="recomendation__list list">
            <li
                v-for="(cocktail, cocktailIndex) in cocktails"
                :key="`list__item-${cocktailIndex}`"
                class="list__item cart"
            >
                <div
                    class="cart__header cart-header"
                    v-if="!!cocktail.rating || !!cocktail.visitCount"
                >
                    <div
                        class="cart-header__rating cart-header-rating"
                        v-if="!!cocktail.rating"
                    >
                        <div class="cart-header-rating__label">
                            {{ Number(cocktail.rating.toFixed(1)) }}
                        </div>
                    </div>
                    <div
                        class="cart-header__visit-count cart-header-visit-count"
                        v-if="!!cocktail.visitCount"
                    >
                        <div class="cart-header-visit-count__label">
                            {{ cocktail.visitCount }}
                        </div>
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
                        class="cart__img"
                        width="120"
                        height="120"
                        loading="lazy"
                        :alt="`Зображення коктейля ${cocktail.name}`"
                        :title="cocktail.name"
                    />
                </picture>
                <NuxtLink
                    :to="`/cocktails/${cocktail.slug}`"
                    class="cart__name"
                >
                    {{ cocktail.name }}
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script>
import TitleH2 from '../global/TitleH2.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CocktailRecomendation',

    components: { TitleH2 },

    props: {
        cocktails: {
            type: Array,
            required: true,
        },
    },
})
</script>
<style lang="scss" scoped>
@import './styles/cocktail-recomendation';
</style>
