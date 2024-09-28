<template>
    <div class="components">
        <h2 class="components__title">
            {{ title }}
        </h2>
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
        <ul class="components__list components-list">
            <li
                class="components-list__item components-list-item"
                v-for="(item, itemIndex) in components"
                :key="`components-list__item--${itemIndex}`"
            >
                <NuxtLink
                    class="components-list-item__link components-list-item-link"
                    :to="`/${item.url}`"
                >
                    <picture class="components-list-item-link__picture">
                        <source
                            v-for="img in item.images"
                            :key="img.id"
                            :srcset="img.srcset"
                            :media="img.media"
                            :type="img.type"
                        />
                        <img
                            class="components-list-item-link__img"
                            width="100"
                            height="100"
                            loading="lazy"
                            :alt="`Зображення ${item.name}`"
                            title=""
                        />
                    </picture>
                    <div class="components-list-item-link__label">
                        {{ item.name }}
                        <template v-if="item.amount">
                            <br />
                            <strong>
                                {{ getAmount(item.amount) }} {{ item.unit }}.
                            </strong>
                        </template>
                    </div>
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script>
import { computed, defineComponent, ref, unref } from 'vue'
import IconBtn from './../UI/IconBtn.vue'

export default defineComponent({
    name: 'CocktailComponents',
    components: { IconBtn },

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
