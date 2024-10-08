<template>
    <div class="blog">
        <BreadCrumbs :breadCrumbs="breadCrumbs" class="blog__breadCrumbs" />
        <div class="blog__header header">
            <h1 class="header__title">Блог</h1>
        </div>
        <div class="blog__body body">
            <div
                v-for="(post, postIndex) in posts"
                :key="`body__post-${postIndex}`"
                class="body__post"
            >
                <div class="post">
                    <img
                        :alt="post.title"
                        :src="post.image"
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
        </div>
    </div>
</template>

<script>
import BreadCrumbs from '../global/BreadCrumbs.vue'
export default {
    name: 'BlogPage',
    components: { BreadCrumbs },
    props: {
        posts: {
            type: Object,
            required: true
        }
    },
    setup() {
        const breadCrumbs = [
            {
                name: 'Блог'
            }
        ]

        return {
            breadCrumbs
        }
    }
}
</script>

<style lang="scss" scoped>
@import './styles/blog-page';
</style>
