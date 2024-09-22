<template>
    <div class="sorting">
        <div class="sorting__title">Сортування</div>
        <ul class="sorting__list sorting-list">
            <li
                class="sorting-list__item sorting-list-item"
                @click="updatePage()"
                v-for="sortItem in sortWithUrl"
                :key="`sorting-list__item-${sortItem.id}`"
            >
                <NuxtLink
                    class="sorting-list-item__link"
                    :class="getLinkClasses(sortItem.isActive)"
                    :to="sortItem.url"
                >
                    {{ sortItem.name }}
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script>
import { sortList } from '~~/utils/sort'
export default {
    name: 'Sorting',
    methods: {
        updatePage(payload) {
            this.$emit('updatePage', payload)
        },
        getLinkClasses(value) {
            return { 'sorting-list-item__link--active': value }
        },
    },
    computed: {
        sortWithUrl() {
            const sortValue = this.$nuxt.$route.query.sort
            return sortList.map((sortItem) => ({
                ...sortItem,
                url:
                    sortValue === sortItem.value
                        ? ``
                        : `?sort=${sortItem.value}`,
                isActive: sortValue === sortItem.value,
            }))
        },
    },
}
</script>

<style lang="scss" scoped>
@import './styles/sorting';
</style>
