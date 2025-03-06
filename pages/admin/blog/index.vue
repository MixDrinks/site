<template>
    <div class="blog">
        <header class="blog__header header">
            <div class="header__title title">
                <span class="title__label"> Блог </span>
                <span class="title__count"> 20 </span>
            </div>
        </header>
        <div class="blog__setting setting">
            <div class="setting__search search">
                <label class="search__label">
                    <span class="search__title"> Пошук </span>
                    <input class="search__input" />
                </label>
            </div>
        </div>
        <div class="table">
            <NuxtLink
                v-for="(post, postIndex) in data.posts"
                :key="`table__item--${postIndex}`"
                :to="`/admin/${pages.blog.slug}/${post.slug}`"
                prefetchOn="interaction"
                class="table__item item"
            >
                <div class="item__name name">
                    <span class="name__label">
                        {{ post.title }}
                    </span>
                </div>
                <img
                    :alt="post.title"
                    :src="post.image"
                    :title="post.title"
                    class="item__image image"
                    width="40"
                    height="40"
                />
                <div class="item__btn btn">
                    <span class="btn__dot" />
                    <span class="btn__dot" />
                    <span class="btn__dot" />
                </div>
            </Nuxtlink>
        </div>
    </div>
</template>

<script>
import { definePageMeta } from '#imports'
import { useRoute, useAsyncData } from 'nuxt/app'
import { defineComponent } from 'vue'
import { head } from '~~/utils/head'
import { querySTR } from '~~/utils/querySTR'
import { getPosts } from '~~/api/pages'
import { pages } from '../../utils/pages'

export default defineComponent({
    name: 'Admin',

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
        const getPath = () => `/${querySTR(route)}`

        const { data } = await useAsyncData(() => getPosts(getPath()))

        return {
            data,
            pages
        }
    }
})
</script>

<style lang="scss" scoped>
@import './../../../components/admin/blog/styles/blog-page';
</style>
