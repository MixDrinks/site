<template>
    <div class="wrapper">
        <div :class="listClasses" class="list">
            <CocktailsCart
                v-for="(cocktail, cocktailIndex) in cocktailsFirst"
                :key="`list__cart-${cocktail.id}${cocktailIndex}`"
                :style="getAnimationDelay(cocktailIndex, true)"
                :cocktail="cocktail"
                :class="cartClasses"
                :isLoadingLazy="false"
                class="list__cart"
            />
        </div>
        <div v-if="ads" class="list__ads">
            <Advertising />
        </div>
        <div v-if="cocktailsSecond.length" :class="listClasses" class="list">
            <CocktailsCart
                v-for="(cocktail, cocktailIndex) in cocktailsSecond"
                :key="`list__cart-${cocktail.id}${cocktailIndex}`"
                :style="getAnimationDelay(cocktailIndex)"
                :cocktail="cocktail"
                :class="cartClasses"
                class="list__cart"
            />
        </div>
    </div>
</template>

<script>
import {
    defineComponent,
    computed,
    toRefs,
    unref,
    watch,
    ref,
    onMounted
} from 'vue'

import Advertising from './Advertising.vue'
import CocktailsCart from './CocktailsCart.vue'

export default defineComponent({
    name: 'CocktailsList',
    components: { CocktailsCart, Advertising },
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
        },
        ads: {
            type: Boolean,
            default: true
        }
    },

    setup(props) {
        const { modificator, cocktails, element } = toRefs(props)

        const listClasses = computed(() => ({
            [`list--${unref(modificator)}`]: Boolean(unref(modificator))
        }))
        const cartClasses = computed(() => ({
            [`list__cart--${unref(modificator)}`]: Boolean(unref(modificator))
        }))

        const isMounted = ref(false)

        onMounted(() => {
            isMounted.value = true
        })

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

        const getAnimationDelay = (index, isFirst) => {
            const divisor = 20
            if (unref(isMounted)) {
                if (isFirst) {
                    return { animationDelay: `${index / divisor}s` }
                }

                if (index / 12 < 1) {
                    return { animationDelay: `${(index + 12) / divisor}s` }
                }

                return { animationDelay: `${((index + 12) % 24) / divisor}s` }
            }

            return false
        }

        return {
            cocktailsFirst,
            cocktailsSecond,
            cartClasses,
            listClasses,
            getAnimationDelay
        }
    }
})
</script>

<style lang="scss" scoped>
@import './styles/cocktails-list';
</style>
