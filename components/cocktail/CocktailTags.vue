<template>
    <ul class="tags">
        <li
            v-for="(tag, tagIndex) in tags"
            :key="`tags__item-${tagIndex}`"
            class="tags__item"
        >
            <Nuxtlink
                :to="`/${tag.url}`"
                prefetchOn="interaction"
                class="tags-link"
            >
                {{ tag.name }}
            </Nuxtlink>
        </li>
    </ul>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CocktailTags',

    props: {
        tags: {
            type: Array,
            required: true
        }
    }
})
</script>

<style lang="scss" scoped>
@import './styles/cocktail-tags';
</style>
