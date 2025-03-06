<template>
    <div class="post">
        <PostMeta class="post__meta" />
        <div class="post__meta meta">
            <div class="meta__date date">
                <span class="date__label"> Дата публікації: </span>
                <span class="date__value">
                    {{ post.published_at }}
                </span>
            </div>
            <div class="meta__title title">
                <span class="title__label"> Заголовк: </span>
                <input :value="post.title" class="title__value" />
            </div>
            <div class="meta__img img">
                <span class="img__label"> Картинка: </span>
                <span class="img__value">
                    {{ post.image }}
                </span>
            </div>
            <div class="meta__slug slug">
                <span class="slug__label"> URL: </span>
                <input :value="post.slug" class="slug__value" />
            </div>
        </div>
        <!-- {{ post.tags }} -->
        <div class="post__body body">
            <div class="body__title">Тіло</div>
            <div
                v-for="(bodyItem, itemIndex) in post.body"
                :key="`body__item-${itemIndex}`"
                class="body__item item"
            >
                <div
                    :class="`title--${bodyItem.type}`"
                    class="item__title title"
                >
                    <span class="title__label">
                        {{ typesTitle[bodyItem.type] }}
                    </span>
                </div>
                <div
                    :class="`content--${bodyItem.type}`"
                    class="item__content content"
                >
                    <component
                        :is="adminTypes[bodyItem.type]"
                        :values="bodyItem.values"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { definePageMeta } from '#imports'
import { useRoute, useAsyncData } from 'nuxt/app'
import { defineComponent } from 'vue'
import { getPost } from '~~/api/pages'
import { adminTypes, typesTitle } from '~~/utils/postItemType'
import { head } from '~~/utils/head'

import PostMeta from '~~/components/admin/blog/PostMeta.vue'

export default defineComponent({
    name: 'AdminPostPage',
    components: { PostMeta },

    async setup() {
        definePageMeta({
            layout: 'admin',
            middleware: 'auth',
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
            adminTypes,
            typesTitle
        }
    }
})
</script>

<style lang="scss" scoped>
@import './../../../components/admin/blog/styles/post-page';
</style>
