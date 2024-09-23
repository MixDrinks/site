<template>
    <main class="wrapper">
        <PostPage :postData="postData" />
    </main>
</template>

<script>
import PostPage from '~~/components/blog/PostPage.vue'
export default {
    components: { PostPage },
    async asyncData({ route, error, $axios }) {
        const post = await $axios
            .get(`/blog/post-details/${route.params.id}`, {
                withCredentials: false,
            })
            .catch(() => {
                return error({
                    statusCode: 404,
                    message: 'This page could not be found',
                })
            })

        return {
            postData: post.data,
        }
    },
    computed: {
        canonical() {
            return process.env.baseUrl + this.$nuxt.$route.path
        },
        title() {
            return 'post title'
        },
        description() {
            return `post description`
        },
    },
    head() {
        return {
            title: this.title,
            link: [{ rel: 'canonical', href: this.canonical }],
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.description,
                },
                {
                    hid: 'og:title',
                    name: 'og:title',
                    content: this.title,
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: this.description,
                },
                {
                    hid: 'og:url',
                    property: 'og:url',
                    content: `${this.canonical}`,
                },
                // {
                //     hid: 'og:image',
                //     property: 'og:image',
                //     content: `${this.post.meta.ogImage}`,
                // },
                { name: 'robots', content: 'noindex, nofollow' },
            ],
        }
    },
    // mounted() {
    //     this.$axios.post(`/post/${this.post.slug}/visit`, {
    //         withCredentials: true,
    //     })
    // },
}
</script>

<style lang="scss" scoped>
.wrapper {
    @include defaultWrapper;
}
</style>
