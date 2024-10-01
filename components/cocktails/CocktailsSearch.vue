<template>
    <label :class="searchClasses" class="search">
        <span class="search__label"> Пошук </span>
        <input
            ref="searchInput"
            @focus="setFocus()"
            @blur="removeFocus()"
            v-model="internalText"
            class="search__input"
            type="text"
        />
    </label>
</template>

<script>
import { computed, defineComponent, unref, ref, watch, toRefs } from 'vue'

export default defineComponent({
    name: 'CocktailsSearch',
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    emits: ['update:value'],
    setup(props, { emit }) {
        const { value } = toRefs(props)
        const internalText = ref(unref(value))

        const focusInput = ref(false)
        const removeFocus = () => (focusInput.value = false)
        const setFocus = () => (focusInput.value = true)

        watch(value, (newVal) => {
            internalText.value = newVal
        })

        watch(internalText, (newVal) => {
            emit('update:value', newVal)
        })

        const searchClasses = computed(() => ({
            'search--filled': Boolean(unref(internalText)) || unref(focusInput)
        }))

        return {
            internalText,
            searchClasses,
            removeFocus,
            setFocus
        }
    }
})
</script>

<style lang="scss" scoped>
@import './styles/cocktails-search';
</style>
