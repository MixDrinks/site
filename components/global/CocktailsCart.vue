<template>
    <div class="cart">
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
                width="100"
                height="100"
                :loading="loading"
                :alt="`Зображення коктейля ${cocktail.name}`"
                :title="cocktail.name"
            />
        </picture>
        <NuxtLink :to="`/cocktails/${cocktail.slug}`" class="cart__name">
            {{ cocktail.name }}
        </NuxtLink>
    </div>
</template>

<script>
import { computed, defineComponent, toRefs, unref } from 'vue'

export default defineComponent({
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
    setup(props) {
        const { isLoadingLazy, cocktail } = toRefs(props)
        const loading = computed(() => (unref(isLoadingLazy) ? 'lazy' : false))

        return {
            loading,
        }
    },
})
</script>

<style lang="scss" scoped>
@import './styles/cocktails-cart.scss';
</style>
