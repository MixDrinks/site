<template>
    <div class="tags">
        <Nuxtlink
            v-for="(tagItem, tagIndex) in tags"
            :key="`tags__item-${tagIndex}`"
            :title="tagItem.name"
            :to="tagItem.url"
            :rel="tagItem.rel"
            prefetchOn="interaction"
            class="tags__item tags-item"
        >
            {{ tagItem.name }}
        </Nuxtlink>
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
