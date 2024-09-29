<template>
    <div class="pagination">
        <TextBtn
            v-show="!!nextPage"
            class="pagination__load-more"
            :href="!!nextPage ? nextPage.link : '/'"
            rel="nofollow"
            @click="loadMore"
        >
            Показати ще {{ limit }}
        </TextBtn>
        <div class="pagination__controls pagination-controls">
            <ul class="pagination-controls__list pagination-controls-list">
                <li
                    v-for="(page, pageIndex) in pagination"
                    :key="`pagination-controls-list__item--${pageIndex}`"
                    class="pagination-controls-list__item pagination-controls-list-item"
                >
                    <TextBtn
                        v-if="page.type === 'link'"
                        class="pagination-controls-list-item__link"
                        :href="page.link"
                        rel="nofollow"
                    >
                        {{ page.title }}
                    </TextBtn>
                    <span
                        v-else
                        class="pagination-controls-list-item__link"
                        :class="`pagination-controls-list-item__link--${page.type}`"
                    >
                        {{ page.title }}
                    </span>
                </li>
            </ul>
            <div class="pagination-controls__btns pagination-controls-btns">
                <IconBtn
                    class="pagination-controls-btns__item pagination-controls-btns__item--prev"
                    direction="top"
                    icon="/img/icons/arrow.svg"
                    :lock="!!!prevPage"
                    :href="!!prevPage ? prevPage.link : '/'"
                    rel="prev"
                >
                    Попередня сторінка
                </IconBtn>
                <IconBtn
                    class="pagination-controls-btns__item pagination-controls-btns__item--next"
                    direction="bottom"
                    icon="/img/icons/arrow.svg"
                    :lock="!!!nextPage"
                    :href="!!nextPage ? nextPage.link : '/'"
                    rel="next"
                >
                    Наступна сторінка
                </IconBtn>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, defineComponent, toRefs, unref } from 'vue'
import { useRoute } from 'vue-router'

import IconBtn from './../UI/IconBtn.vue'
import TextBtn from './../UI/TextBtn.vue'
export default defineComponent({
    name: 'Pagination',
    components: { IconBtn, TextBtn },

    props: {
        totalItems: {
            type: Number,
            required: true
        },
        limit: {
            type: Number,
            required: true
        }
    },
    emits: ['loadMore'],
    setup(props, { emit }) {
        const route = useRoute()
        const differencePaginationIndex = 2
        const dotsObj = {
            title: '...',
            type: 'dots'
        }
        const { totalItems, limit } = toRefs(props)

        const getPage = (pageIndex) => {
            if (!pageIndex) {
                return unref(query) ? unref(query) : route.path
            }

            return `${unref(query) ? unref(query) + '&' : '?'}page=${pageIndex}`
        }
        const query = computed(() => {
            if (route.query.sort) {
                return `?sort=${route.query.sort}`
            }
            return false
        })
        const currentPage = computed(() => {
            if (route.query.page) {
                return Number(route.query.page)
            }
            return 0
        })
        const pageCount = computed(() =>
            Math.ceil(unref(totalItems) / unref(limit))
        )
        const prevPage = computed(() => {
            if (unref(currentPage) != 0) {
                return unref(allPageArr)[unref(currentPage) - 1]
            }
            return false
        })
        const nextPage = computed(() => {
            if (unref(currentPage) != unref(allPageArr).length) {
                return unref(allPageArr)[unref(currentPage) + 1]
            }
            return false
        })
        const allPageArr = computed(() => {
            const arr = []
            for (let index = 0; index < unref(pageCount); index++) {
                arr.push({
                    title: index + 1,
                    link: getPage(index),
                    type: 'link'
                })
            }
            return arr
        })
        const currentPageObj = computed(() => ({
            ...unref(allPageArr)[unref(currentPage)],
            type: 'current'
        }))
        const prevPagesArr = computed(() => {
            if (unref(currentPage) > differencePaginationIndex) {
                return [unref(allPageArr)[0], dotsObj, unref(prevPage)]
            }
            return unref(allPageArr).slice(0, unref(currentPage))
        })
        const nextPagesArr = computed(() => {
            if (
                unref(pageCount) - unref(currentPage) >
                differencePaginationIndex + 1
            ) {
                return [
                    unref(nextPage),
                    dotsObj,
                    unref(allPageArr)[unref(pageCount) - 1]
                ]
            }
            return unref(allPageArr).slice(unref(currentPage) + 1)
        })
        const pagination = computed(() => {
            return [
                ...unref(prevPagesArr),
                unref(currentPageObj),
                ...unref(nextPagesArr)
            ]
        })

        const loadMore = () => {
            emit('loadMore', unref(nextPage).link)
        }

        return {
            currentPage,
            allPageArr,
            prevPage,
            nextPage,
            pagination,
            loadMore
        }
    }
})
</script>

<style lang="scss" scoped>
@import './styles/pagination';
</style>
