<template>
    <div class="items">
        <h1 class="items__title" itemprop="name">
            {{ items.name }}
        </h1>
        <div class="items__main items-main">
            <picture class="items-main__picture">
                <source
                    v-for="img in items.images"
                    :key="img.id"
                    :srcset="img.srcset"
                    :media="img.media"
                    :type="img.type"
                />
                <img
                    class="items-main__img"
                    width="500"
                    height="500"
                    loading="lazy"
                    :alt="`Зображення ${items.name}`"
                    title=""
                />
            </picture>
            <div class="items-main__about items-main-about">
                <h2 class="items-main-about__title">Опис {{ items.name }}</h2>
                <p class="items-main-about__text">{{ items.about }}</p>
            </div>
        </div>
        <div class="items__cocktails items-cocktails">
            <h2 class="items-cocktails__title">
                Коктейлі з використанням {{ items.name }}
            </h2>
            <CocktailsList :cocktails="cocktailsFull.cocktails" />
        </div>
        <Pagination
            v-if="cocktailsFull.totalCount > 24"
            class="items__pagination"
            :totalItems="cocktailsFull.totalCount"
            :limit="24"
            :itemsCount="cocktailsFull.cocktails.length"
            @updatePage="updatePage"
        />
    </div>
</template>

<script>
import CocktailsList from '../cocktails/CocktailsList.vue'
import Pagination from '../dump/Pagination.vue'
export default {
    components: { Pagination, CocktailsList },
    name: 'ItemsPage',
    props: {
        items: {
            type: Object,
            required: true,
        },
        cocktailsFull: {
            type: Object,
            required: true,
        },
    },
    methods: {
        updatePage(payload) {
            this.$emit('updatePage', payload)
        },
    },
}
</script>

<style lang="scss" scoped>
@import './styles/items-page';
</style>
