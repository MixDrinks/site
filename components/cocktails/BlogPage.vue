<template>
    <div class="cocktails">
        <div class="cocktails__header cocktails-header">
            <h1 class="cocktails-header__title">Блог</h1>
        </div>
        <div class="cocktails__body cocktails-body">
            {{ postFull }}
        </div>
        <Pagination
            v-if="postFull.postCount > 24"
            class="cocktails__pagination"
            :totalItems="postFull.postCount"
            :limit="24"
            :itemsCount="postFull.posts.length"
            @updateCocktails="updateCocktails"
        />
    </div>
</template>

<script>
import Pagination from '~~/components/dump/Pagination.vue'
export default {
    components: { Pagination },
    name: 'BlogPage',
    props: {
        postFull: {
            type: Object,
            required: true,
        },
    },
    methods: {
        updateCocktails(payload) {
            this.$emit('updateCocktails', payload)
        },
    },
}
</script>

<style lang="scss" scoped>
@import './styles/cocktails-page';
</style>
