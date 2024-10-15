<template>
    <div class="post">
        <div class="post__header header">
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
                    :is="adminTypes[bodyItem.type]"
                    :values="bodyItem.values"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { definePageMeta } from '#imports'
import { useRoute, useAsyncData } from 'nuxt/app'
import { defineComponent } from 'vue'
import { getPost } from '~~/api/pages'
import { adminTypes } from '~~/utils/postItemType'
import { head } from '~~/utils/head'

export default defineComponent({
    name: 'AdminPostPage',
    components: {},

    async setup() {
        definePageMeta({
            layout: 'admin',
            pageTransition: {
                name: 'none'
            }
        })
        head({
            title: 'Панель блог',
            description: 'Панель блог',
            indexPage: false
        })
        const route = useRoute()
        const getPath = () => `/${route.params.id}`

        const { data: post } = await useAsyncData(() => getPost(getPath()))

        return {
            post,
            adminTypes
        }
    }
})
</script>

<style lang="scss" scoped>
@import './../../../components/admin/blog/styles/post-page';
</style>
