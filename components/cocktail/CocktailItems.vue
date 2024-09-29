<template>
    <div class="items">
        <TitleH2 class="items__title" :text="title"></TitleH2>
        <div class="items__counter counter" v-if="withCounter">
            <IconBtn
                class="counter__btn"
                :lock="isDecLock"
                icon="/img/icons/minus.svg"
                @click="dec"
            >
                Декримент
            </IconBtn>
            <div class="counter__value">
                {{ counter }}
            </div>
            <IconBtn
                class="counter__btn"
                icon="/img/icons/plus.svg"
                @click="inc"
            >
                Інкримент
            </IconBtn>
        </div>
        <ul class="items__list list">
            <li
                class="list__item"
                v-for="(item, itemIndex) in items"
                :key="`list__item--${itemIndex}`"
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
                            class="cart__img"
                            width="100"
                            height="100"
                            loading="lazy"
                            :alt="`Зображення ${item.name}`"
                            :title="item.name"
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
import { computed, defineComponent, ref, unref } from 'vue'
import TitleH2 from '../global/TitleH2.vue'
import IconBtn from '../UI/IconBtn.vue'

export default defineComponent({
    components: { IconBtn },
    name: 'CocktailItems',
    items: { IconBtn, TitleH2 },

    props: {
        items: {
            type: Array,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        withCounter: {
            type: Boolean,
            default: false,
        },
    },

    setup() {
        const counter = ref(1)

        const inc = () => counter.value++
        const dec = () => {
            if (unref(counter) > 1) counter.value--
        }
        const getAmount = (value) => value * unref(counter)
        const isDecLock = computed(() => unref(counter) === 1)

        return {
            getAmount,
            counter,
            inc,
            dec,
            isDecLock,
        }
    },
})
</script>
<style lang="scss" scoped>
@import './styles/cocktail-items';
</style>
