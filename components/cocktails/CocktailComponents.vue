<template>
    <div class="components">
        <TitleH2 class="components__title" :text="title"></TitleH2>
        <div class="components__counter components-counter" v-if="withCounter">
            <IconBtn
                class="components-counter__btn"
                :lock="isDecLock"
                icon="/img/icons/minus.svg"
                @click="dec"
            >
                Декримент
            </IconBtn>
            <div class="components-counter__value">
                {{ counter }}
            </div>
            <IconBtn
                class="components-counter__btn"
                icon="/img/icons/plus.svg"
                @click="inc"
            >
                Інкримент
            </IconBtn>
        </div>
        <ul class="components__list list">
            <li
                class="list__item list-item"
                v-for="(item, itemIndex) in components"
                :key="`list__item--${itemIndex}`"
            >
                <picture class="list-item__picture">
                    <source
                        v-for="img in item.images"
                        :key="img.id"
                        :srcset="img.srcset"
                        :media="img.media"
                        :type="img.type"
                    />
                    <img
                        class="list-item__img"
                        width="100"
                        height="100"
                        loading="lazy"
                        :alt="`Зображення ${item.name}`"
                        :title="item.name"
                    />
                </picture>
                <NuxtLink :to="`/${item.url}`" class="list-item__label">
                    {{ item.name }}
                    <template v-if="item.amount">
                        <br />
                        <strong>
                            {{ getAmount(item.amount) }} {{ item.unit }}.
                        </strong>
                    </template>
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script>
import { computed, defineComponent, ref, unref } from 'vue'
import TitleH2 from '../global/TitleH2.vue'
import IconBtn from './../UI/IconBtn.vue'

export default defineComponent({
    name: 'CocktailComponents',
    components: { IconBtn, TitleH2 },

    props: {
        components: {
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
@import './styles/cocktail-components';
</style>
