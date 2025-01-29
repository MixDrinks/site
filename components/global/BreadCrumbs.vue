<template>
    <ol
        itemscope=""
        itemtype="https://schema.org/BreadcrumbList"
        class="bread-crumbs"
    >
        <li
            v-for="(breadCrumb, breadCrumbIndex) in newBreadCrumbs"
            :key="`bread-crumbs__item-${breadCrumbIndex}`"
            itemprop="itemListElement"
            itemscope=""
            itemtype="https://schema.org/ListItem"
            class="bread-crumbs__item"
        >
            <NuxtLink
                v-if="breadCrumb.slug"
                :to="breadCrumb.slug"
                prefetchOn="interaction"
                itemprop="item"
                class="bread-crumbs__link"
            >
                <span itemprop="name">{{ breadCrumb.name }}</span>
                <meta :content="breadCrumbIndex + 1" itemprop="position" />
            </Nuxtlink>
            <span
                v-else
                itemprop="item"
                class="bread-crumbs__link bread-crumbs__link--active"
            >
                <span itemprop="name">{{ breadCrumb.name }}</span>
                <meta :content="breadCrumbIndex + 1" itemprop="position" />
            </span>
        </li>
    </ol>
</template>

<script>
import { defineComponent, toRefs, unref } from 'vue'

export default defineComponent({
    name: 'BreadCrumbs',
    props: {
        breadCrumbs: {
            type: Array,
            default: () => []
        }
    },

    setup(props) {
        const { breadCrumbs } = toRefs(props)
        const mainPage = {
            name: 'Головна',
            slug: '/'
        }
        const newBreadCrumbs = [mainPage, ...unref(breadCrumbs)]

        return {
            newBreadCrumbs
        }
    }
})
</script>

<style lang="scss" scoped>
@import './styles/bread-crumbs';
</style>
