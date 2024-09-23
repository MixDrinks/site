<template>
    <NuxtLink :to="`/cocktails/${values.slug}`" class="cocktail">
        <div
            class="cocktail__info cocktail-info"
            v-if="!!values.rating || !!values.visitCount"
        >
            <div
                class="cocktail-info__rating cocktail-info-rating"
                v-if="!!values.rating"
            >
                <div class="cocktail-info-rating__label">
                    {{ Number(values.rating.toFixed(1)) }}
                </div>
            </div>
            <div
                class="cocktail-info__visit-count cocktail-info-visit-count"
                v-if="!!values.visitCount"
            >
                <div class="cocktail-info-visit-count__label">
                    {{ values.visitCount }}
                </div>
            </div>
        </div>
        <picture class="cocktail__picture">
            <source
                v-for="img in values.images"
                :key="img.id"
                :srcset="img.srcset"
                :media="img.media"
                :type="img.type"
            />
            <img
                class="cocktail__img"
                width="298"
                height="298"
                loading="lazy"
                :alt="`Зображення коктейля ${values.name}`"
                title=""
            />
        </picture>
        <div class="cocktail__name">
            {{ values.name }}
        </div>
    </NuxtLink>
</template>

<script>
export default {
    name: 'PostCocktail',
    props: {
        values: {
            type: Object,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped>
@import './styles/post-cocktail';
</style>
