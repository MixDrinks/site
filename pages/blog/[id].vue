<template>
    <main class="wrapper">
        <div class="post">
            <BreadCrumbs :breadCrumbs="breadCrumbs" class="post__breadCrumbs" />
            <div class="post__header header">
                <CocktailTags :tags="tags" class="header__tags" />
                <h1 class="header__title">
                    {{ post.title }}
                </h1>
            </div>
            <div class="post__body body">
                <div
                    v-for="(bodyItem, itemIndex) in post.body"
                    :key="`body__item-${itemIndex}`"
                    class="body__item item"
                >
                    <component
                        :is="types[bodyItem.type]"
                        :values="bodyItem.values"
                    />
                </div>
            </div>
            <Date :date="post.published_at" class="post__date" />
        </div>
    </main>
</template>

<script>
import { useHead, useRoute, useAsyncData } from 'nuxt/app'
import { computed, defineComponent, unref } from 'vue'
import { getPost } from '~~/api/pages'
import { types } from '~~/utils/postItemType'
import { pages } from '../../utils/pages'

import CocktailTags from '~~/components/cocktail/CocktailTags.vue'
import Date from '~~/components/global/Date.vue'
import BreadCrumbs from '~~/components/global/BreadCrumbs.vue'

export default defineComponent({
    name: 'PostPage',
    components: { CocktailTags, Date, BreadCrumbs },

    async setup() {
        useHead({
            meta: [{ name: 'robots', content: 'noindex, nofollow' }]
        })
        const route = useRoute()
        const getPath = () => `/${route.params.id}`

        const { data: post } = await useAsyncData(() => getPost(getPath()))

        const tags = computed(() =>
            unref(post).tags.map((tag) => ({
                name: tag.name,
                url: `${pages.blog.slug}/t/${tag.slug}`
            }))
        )

        const breadCrumbs = [
            {
                name: 'Блог',
                slug: `/${pages.blog.slug}`
            },
            {
                name: unref(post).title
            }
        ]

        return {
            post,
            types,
            tags,
            breadCrumbs
        }
    }

    // head() {
    //     return {
    //         title: this.title,
    //         link: [{ rel: 'canonical', href: this.canonical }],
    //         meta: [
    //             {
    //                 hid: 'description',
    //                 name: 'description',
    //                 content: this.description,
    //             },
    //             {
    //                 hid: 'og:title',
    //                 name: 'og:title',
    //                 content: this.title,
    //             },
    //             {
    //                 hid: 'og:description',
    //                 property: 'og:description',
    //                 content: this.description,
    //             },
    //             {
    //                 hid: 'og:url',
    //                 property: 'og:url',
    //                 content: `${this.canonical}`,
    //             },
    //             {
    //                 hid: 'og:image',
    //                 property: 'og:image',
    //                 content: `${this.post.meta.ogImage}`,
    //             },

    //         ],
    //     }
    // },
    // mounted() {
    //     this.$axios.post(`/post/${this.post.slug}/visit`, {
    //         withCredentials: true,
    //     })
    // },
})
</script>

<style lang="scss" scoped>
.wrapper {
    @include defaultWrapper;
}
@import './../../components/blog/styles/post-page.scss';
</style>
