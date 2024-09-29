<template>
    <div class="blog">
        <div class="blog__header header">
            <h1 class="header__title">Блог</h1>
        </div>
        <div class="blog__body body">
            <div
                v-for="(post, postIndex) in postsData.posts"
                :key="`body__post-${postIndex}`"
                class="body__post post"
            >
                <img
                    :alt="post.title"
                    src="https://mixdrinks-cdn.vovastelmashchuk.site/cocktails/561/560/561.webp"
                    class="post__img"
                    width="410"
                    height="200"
                    title=""
                />
                <NuxtLink :to="`/blog/${post.slug}`" class="post__title">
                    {{ post.title }}
                </NuxtLink>
            </div>
        </div>
        <Pagination
            v-if="postsData.postCount > 24"
            @update-page="updatePage"
            :totalItems="postsData.postCount"
            :limit="24"
            :itemsCount="postsData.posts.length"
            class="blog__pagination"
        />
    </div>
</template>

<script>
import Pagination from '~~/components/dump/Pagination.vue'
export default {
    name: 'BlogPage',
    components: { Pagination },
    props: {
        postsData: {
            type: Object,
            required: true
        }
    },
    methods: {
        updatePage(payload) {
            this.$emit('updatePage', payload)
        }
    }
}
</script>

<style lang="scss" scoped>
@import './styles/blog-page';
</style>
