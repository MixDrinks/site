<template>
    <div class="tags">
        <NuxtLink
            v-for="(tagItem, tagIndex) in tags"
            :key="`tags__item-${tagIndex}`"
            :title="tagItem.name"
            :to="tagItem.url"
            :rel="tagItem.rel"
            class="tags__item tags-item"
        >
            {{ tagItem.name }}
        </NuxtLink>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CocktailsTags',

    props: {
        tags: {
            type: Array,
            required: true
        }
    }
})
</script>

<style lang="scss" scoped>
@import './styles/cocktails-tags';
</style>
