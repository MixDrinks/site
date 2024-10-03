<template>
    <main class="wrapper">
        <div class="post">
            <div class="post__header header">
                <h1 class="header__title">
                    {{ post.title }}
                </h1>
                <img
                    :alt="post.title"
                    :src="post.image"
                    class="post__img"
                    width="410"
                    height="200"
                    title=""
                />
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
        </div>
    </main>
</template>

<script>
import { useHead, useRoute, useAsyncData } from 'nuxt/app'
import { defineComponent } from 'vue'
import { getPost } from '~~/api/pages'
import { types } from '~~/utils/postItemType'

export default defineComponent({
    name: 'PostPage',

    async setup() {
        useHead({
            meta: [{ name: 'robots', content: 'noindex, nofollow' }]
        })
        const route = useRoute()
        const getPath = () => `/${route.params.id}`

        const { data: post } = await useAsyncData(() => getPost(getPath()))

        return {
            post,
            types
        }
    }

    // async asyncData({ route, error, $axios }) {
    //     const post = await $axios
    //         .get(`/blog/post-details/${route.params.id}`, {
    //             withCredentials: false,
    //         })
    //         .catch(() => {
    //             return error({
    //                 statusCode: 404,
    //                 message: 'This page could not be found',
    //             })
    //         })

    //     return {
    //         postData: post.data,
    //     }
    // },

    // computed: {
    //     canonical() {
    //         return process.env.baseUrl + this.$nuxt.$route.path
    //     },
    //     title() {
    //         return 'post title'
    //     },
    //     description() {
    //         return `post description`
    //     },
    // },

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
