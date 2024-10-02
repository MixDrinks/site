<template>
    <div class="wrapper">
        <TransitionGroup
            :class="listClasses"
            tag="div"
            class="list"
            name="list"
        >
            <div
                v-for="(cocktail, cocktailIndex) in cocktailsFirst"
                :key="`item-${cocktail.id}${cocktailIndex}`"
                :class="itemClasses"
                class="list__item item"
            >
                <CocktailsCart :cocktail="cocktail" />
            </div>
        </TransitionGroup>
        <div class="list__ads">
            <ins
                class="adsbygoogle"
                style="display: block"
                data-ad-format="fluid"
                data-ad-layout-key="-gh-4+1q-51+45"
                data-ad-client="ca-pub-9033785625371866"
                data-ad-slot="2682031593"
            />
        </div>
        <TransitionGroup
            :class="listClasses"
            tag="div"
            class="list"
            name="list"
        >
            <div
                v-for="cocktail in cocktailsSecond"
                :key="`item-${cocktail.id}`"
                :class="itemClasses"
                class="list__item item"
            >
                <CocktailsCart :cocktail="cocktail" isLoadingLazy />
            </div>
        </TransitionGroup>
    </div>
</template>

<script>
import { useHead } from 'nuxt/app'
import { defineComponent, computed, toRefs, unref, watch } from 'vue'

import CocktailsCart from './CocktailsCart.vue'

export default defineComponent({
    name: 'CocktailsList',
    components: { CocktailsCart },
    props: {
        cocktails: {
            type: Array,
            required: true
        },
        modificator: {
            type: String,
            default: ''
        },
        element: {
            type: Object,
            default: () => {}
        }
    },

    setup(props) {
        useHead({
            script: [
                {
                    async: true,
                    src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9033785625371866',
                    crossorigin: 'anonymous'
                },
                {
                    innerHTML: `;(adsbygoogle = window.adsbygoogle || []).push({})`
                }
            ]
        })
        const { modificator, cocktails, element } = toRefs(props)

        const listClasses = computed(() => ({
            [`list--${unref(modificator)}`]: Boolean(unref(modificator))
        }))
        const itemClasses = computed(() => ({
            [`item--${unref(modificator)}`]: Boolean(unref(modificator))
        }))

        watch(cocktails, () => {
            if (unref(cocktails).length <= 24) {
                if (unref(element)) {
                    unref(element).scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    })
                } else {
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    })
                }
            }
        })

        const checkLength = computed(() => unref(cocktails).length > 12)
        const cocktailsFirst = computed(() =>
            unref(checkLength)
                ? unref(cocktails).slice(0, 12)
                : unref(cocktails)
        )
        const cocktailsSecond = computed(() =>
            unref(checkLength) ? unref(cocktails).slice(12) : []
        )

        return {
            cocktailsFirst,
            cocktailsSecond,
            itemClasses,
            listClasses
        }
    }
})
</script>

<style lang="scss" scoped>
@import './styles/cocktails-list';
</style>
