<template>
    <!-- <transition name="fate-in" appear> -->
    <NuxtLink :to="`/cocktails/${cocktail.slug}`" class="cart">
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
                width="100"
                height="100"
                :loading="loading"
                :alt="`Зображення коктейля ${cocktail.name}`"
                title=""
            />
        </picture>
        <div class="cart__name">
            {{ cocktail.name }}
        </div>
    </NuxtLink>
    <!-- </transition> -->
</template>

<script>
export default {
    name: 'CocktailsCart',
    props: {
        isLoadingLazy: {
            type: Boolean,
            default: true,
        },
        cocktail: {
            type: Object,
            required: true,
        },
    },
    computed: {
        loading() {
            return this.isLoadingLazy ? 'lazy' : false
        },
    },
}
</script>

<style lang="scss" scoped>
@import './styles/cocktails-cart';
</style>
