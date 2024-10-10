<template>
    <div class="search">
        <label :class="searchClasses" class="search__header search-header">
            <span class="search-header__label"> Пошук коктейля </span>
            <input
                ref="searchInput"
                @focus="setFocus()"
                @blur="removeFocus()"
                v-model="inputValue"
                class="search-header__input"
                type="text"
            />
        </label>
        <div :class="resultClasses" class="search__result search-result">
            <div :style="{ height: height }" class="search-result__animations">
                <ul ref="animations" class="search-result__list list">
                    <li
                        v-for="(listItem, itemIndex) in filteredList"
                        :key="`list__item-${itemIndex}`"
                        class="list__item list-item"
                    >
                        <NuxtLink
                            v-if="checkSlug(listItem.slug)"
                            :to="`/${pages.cocktail.slug}/${listItem.slug}`"
                            class="list-item__link"
                        >
                            {{ listItem.name }}
                        </NuxtLink>
                        <span
                            v-else
                            class="list-item__link list-item__link--active"
                        >
                            {{ listItem.name }}
                        </span>
                    </li>
                    <li
                        v-if="!!!filteredList.length && !!inputValue"
                        class="list__item list-item"
                    >
                        <span class="list-item__span">
                            Нічого не знайдено
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {
    computed,
    defineComponent,
    ref,
    unref,
    onUpdated,
    onMounted
} from 'vue'
import { useRoute } from 'nuxt/app'
import { pages } from '../../utils/pages'

export default defineComponent({
    name: 'Search',

    setup() {
        const route = useRoute()
        const inputValue = ref('')
        const listSearch = ref([])
        const animations = ref('')
        const animationsHeight = ref(unref(animations).offsetHeight)
        const focusInput = ref(false)

        const removeFocus = () => (focusInput.value = false)

        async function setListSearch() {
            listSearch.value = await $fetch(
                `https://newapi.mixdrinks.org/api/cocktails/all`
            )
        }

        const height = computed(() => {
            if (unref(focusInput) && unref(inputValue)) {
                return `${unref(animationsHeight)}px`
            }
            return `0px`
        })

        onMounted(
            () => (animationsHeight.value = unref(animations).offsetHeight)
        )
        onUpdated(
            () => (animationsHeight.value = unref(animations).offsetHeight)
        )

        const setFocus = () => {
            inputValue.value = ''
            focusInput.value = true
            if (!unref(listSearch).length) setListSearch()
        }

        const resultClasses = computed(() => ({
            'search-result--filled': unref(focusInput) && unref(inputValue)
        }))
        const searchClasses = computed(() => ({
            'search-header--focus': unref(focusInput)
        }))
        const filteredList = computed(() => {
            if (unref(inputValue)) {
                return unref(listSearch).filter((item) =>
                    item.name
                        .toLowerCase()
                        .includes(unref(inputValue).toLowerCase())
                )
            }
            return []
        })
        const checkSlug = (slug) => !(slug === route.params.cocktail)

        return {
            inputValue,
            listSearch,
            focusInput,
            removeFocus,
            setFocus,
            searchClasses,
            filteredList,
            animations,
            height,
            resultClasses,
            checkSlug,
            pages
        }
    }
})
</script>

<style lang="scss" scoped>
@import './styles/search';
</style>
