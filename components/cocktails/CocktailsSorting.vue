<template>
    <div class="sorting">
        <div class="sorting__title">Сортування</div>
        <ul class="sorting__list sorting-list">
            <li
                v-for="sortItem in sortWithUrl"
                :key="`sorting-list__item-${sortItem.id}`"
                class="sorting-list__item sorting-list-item"
            >
                <NuxtLink
                    :class="getLinkClasses(sortItem.isActive)"
                    :to="sortItem.url"
                    class="sorting-list-item__link"
                >
                    {{ sortItem.name }}
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script>
import { useRoute } from 'nuxt/app'
import { computed, defineComponent } from 'vue'
import { sortList } from '~~/utils/sort'

export default defineComponent({
    name: 'CocktailsSorting',

    setup() {
        const route = useRoute()

        const sortWithUrl = computed(() => {
            const sortValue = route.query.sort
            return sortList.map((sortItem) => ({
                ...sortItem,
                url:
                    sortValue === sortItem.value
                        ? `${route.path}`
                        : `?sort=${sortItem.value}`,
                isActive: sortValue === sortItem.value
            }))
        })

        const getLinkClasses = (value) => ({
            'sorting-list-item__link--active': value
        })

        return {
            getLinkClasses,
            sortWithUrl
        }
    }
})
</script>

<style lang="scss" scoped>
@import './styles/cocktails-sorting';
</style>
