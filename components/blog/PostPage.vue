<template>
    <div class="post">
        <div class="post__header header">
            <h1 class="header__title">
                {{ postData.title }}
            </h1>
            <img
                :alt="postData.title"
                src="https://mixdrinks-cdn.vovastelmashchuk.site/cocktails/561/560/561.webp"
                class="post__img"
                width="410"
                height="200"
                loading="lazy"
                title=""
            />
        </div>
        <div class="post__body body">
            <div
                v-for="(bodyItem, itemIndex) in postData.body"
                :key="`body__item-${itemIndex}`"
                class="body__item item"
            >
                <component
                    :is="types[bodyItem.type]"
                    :values="bodyItem.values"
                ></component>
            </div>
        </div>
    </div>
</template>

<script>
import { types } from '~~/utils/postItemType'
import Pagination from '~~/components/dump/Pagination.vue'
export default {
    components: { Pagination },
    name: 'PostPage',
    props: {
        postData: {
            type: Object,
            required: true,
        },
    },
    computed: {
        types() {
            return types
        },
    },
}
</script>

<style lang="scss" scoped>
@import './styles/post-page';
</style>
