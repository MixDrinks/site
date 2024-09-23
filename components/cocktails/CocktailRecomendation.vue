<template>
    <div class="recomendation">
        <h2 class="recomendation__title">Рекомендуємо спробувати</h2>
        <ul class="recomendation__list list">
            <li
                v-for="(cocktail, cocktailIndex) in cocktails"
                :key="`list__item-${cocktailIndex}`"
                class="list__item item"
            >
                <NuxtLink
                    :to="`/cocktails/${cocktail.slug}`"
                    class="item__cart cart"
                >
                    <div
                        class="cart__info cart-info"
                        v-if="!!cocktail.rating || !!cocktail.visitCount"
                    >
                        <div
                            class="cart-info__rating cart-info-rating"
                            v-if="!!cocktail.rating"
                        >
                            <div class="cart-info-rating__label">
                                {{ Number(cocktail.rating.toFixed(1)) }}
                            </div>
                        </div>
                        <div
                            class="cart-info__visit-count cart-info-visit-count"
                            v-if="!!cocktail.visitCount"
                        >
                            <div class="cart-info-visit-count__label">
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
                            title=""
                        />
                    </picture>
                    <div class="cart__name">
                        {{ cocktail.name }}
                    </div>
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'CocktailRecomendation',

    props: {
        cocktails: {
            type: Array,
            required: true,
        },
    },
}
</script>
<style lang="scss" scoped>
@import './styles/cocktail-recomendation';
</style>
