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
                class="list__item"
            >
                <div class="cart">
                    <div
                        class="cart__header cart-header"
                        v-if="!!cocktail.rating || !!cocktail.visitCount"
                    >
                        <div
                            class="cart-header__rating cart-header-rating"
                            v-if="!!cocktail.rating"
                        >
                            {{ getRating(cocktail.rating) }}
                        </div>
                        <div
                            class="cart-header__visit-count cart-header-visit-count"
                            v-if="!!cocktail.visitCount"
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
                </div>
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
    setup() {
        const getRating = (value) => Number(value.toFixed(1))

        return {
            getRating,
        }
    },
})
</script>
<style lang="scss" scoped>
@import './styles/cocktail-recomendation';
</style>
