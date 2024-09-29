<template>
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
                :loading="loading"
                :alt="`Зображення коктейля ${cocktail.name}`"
                :title="cocktail.name"
                class="cart__img"
                width="100"
                height="100"
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
            default: true
        },
        cocktail: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const { isLoadingLazy } = toRefs(props)
        const loading = computed(() => (unref(isLoadingLazy) ? 'lazy' : false))
        const getRating = (value) => Number(value.toFixed(1))

        return {
            loading,
            getRating
        }
    }
})
</script>

<style lang="scss" scoped>
@import './styles/cocktails-cart.scss';
</style>
