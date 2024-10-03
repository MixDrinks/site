<template>
    <div :class="itemsClasses" class="items">
        <TitleH2 :text="title" class="items__title" />
        <div v-if="withCounter" class="items__counter counter">
            <IconBtn
                @click="dec"
                :lock="isDecLock"
                class="counter__btn"
                icon="/img/icons/minus.svg"
            >
                Декримент
            </IconBtn>
            <div class="counter__value">
                {{ counter }}
            </div>
            <IconBtn
                @click="inc"
                class="counter__btn"
                icon="/img/icons/plus.svg"
            >
                Інкримент
            </IconBtn>
        </div>
        <ul class="items__list list">
            <li
                v-for="(item, itemIndex) in items"
                :key="`list__item--${itemIndex}`"
                class="list__item"
            >
                <div class="cart">
                    <picture class="cart__picture">
                        <source
                            v-for="img in item.images"
                            :key="img.id"
                            :srcset="img.srcset"
                            :media="img.media"
                            :type="img.type"
                        />
                        <img
                            :alt="`Зображення ${item.name}`"
                            :title="item.name"
                            class="cart__img"
                            width="100"
                            height="100"
                            loading="lazy"
                        />
                    </picture>
                    <NuxtLink
                        :to="`/${item.url}`"
                        class="cart__label cart__label--link"
                    >
                        {{ item.name }}
                    </NuxtLink>
                    <p v-if="item.amount" class="cart__label">
                        <strong>
                            {{ getAmount(item.amount) }} {{ item.unit }}.
                        </strong>
                    </p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { computed, defineComponent, ref, toRefs, unref } from 'vue'
import TitleH2 from '../global/TitleH2.vue'
import IconBtn from '../UI/IconBtn.vue'

export default defineComponent({
    name: 'CocktailItems',
    components: { IconBtn },
    items: { IconBtn, TitleH2 },

    props: {
        items: {
            type: Array,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        withCounter: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: ''
        }
    },

    setup(props) {
        const { size } = toRefs(props)
        const counter = ref(1)

        const inc = () => counter.value++
        const dec = () => {
            if (unref(counter) > 1) counter.value--
        }
        const getAmount = (value) => value * unref(counter)
        const isDecLock = computed(() => unref(counter) === 1)
        const itemsClasses = computed(() => ({
            [`items--size-${unref(size)}`]: Boolean(unref(size))
        }))
        return {
            getAmount,
            counter,
            inc,
            dec,
            isDecLock,
            itemsClasses
        }
    }
})
</script>
<style lang="scss" scoped>
@import './styles/cocktail-items';
</style>
