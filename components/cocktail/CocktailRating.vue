<template>
    <div class="rating">
        <div
            class="rating__wrapper rating-wrapper"
            :class="wrapperClasses"
            @mouseleave="hoverItemIndex = null"
        >
            <div class="rating-wrapper__stars rating-wrapper-stars">
                <div
                    v-for="(star, starIndex) in stars"
                    :key="`rating-wrapper-stars__item-${starIndex}`"
                    class="rating-wrapper-stars__item rating-wrapper-stars-item"
                    :class="getStarItemClasses(starIndex)"
                    @mouseover="hoverItemIndex = starIndex"
                    @click="setRating(starIndex)"
                >
                    <div class="rating-wrapper-stars-item__start--gray" />
                    <div
                        class="rating-wrapper-stars-item__start--full"
                        :style="'width:' + star.width"
                    />
                </div>
            </div>
            <div
                v-if="actualRatingValue"
                class="rating-wrapper__aggregate"
                itemprop="aggregateRating"
                itemscope
                itemtype="http://schema.org/AggregateRating"
            >
                <span class="rating-wrapper__value" itemprop="ratingValue">
                    {{ actualRatingValue }}
                </span>
                <span class="rating-wrapper__count" itemprop="reviewCount">
                    {{ actualReviewCount }}
                </span>
                <span class="rating-wrapper__hidden" itemprop="worstRating">
                    1
                </span>
                <span class="rating-wrapper__hidden" itemprop="bestRating">
                    5
                </span>
                <span class="rating-wrapper__hidden" itemprop="author">
                    MixDrinks
                </span>
            </div>
            <span v-else class="rating-wrapper__spacer" />
        </div>
        <div v-if="isSet" class="rating__text">Дякуємо, що оцінили</div>
    </div>
</template>

<script>
import { ref, toRefs, unref, defineComponent, computed, onMounted } from 'vue'

export default defineComponent({
    name: 'CocktailRating',

    props: {
        ratingCount: {
            type: Number,
            default: 0
        },
        ratingValue: {
            type: Number,
            default: null
        },
        id: {
            type: Number,
            required: true
        },
        slug: {
            type: String,
            required: true
        }
    },

    setup(props) {
        const { ratingCount, ratingValue, id, slug } = toRefs(props)
        const hoverItemIndex = ref(null)
        const ratinglist = ref([])
        const value = ref(null)
        const isSet = ref(false)

        async function updateRating(starIndex) {
            return await $fetch(
                `https://newapi.mixdrinks.org/api/cocktail/${unref(slug)}/score`,
                {
                    method: 'POST',
                    body: {
                        value: starIndex + 1
                    }
                }
            )
        }

        const setRating = (starIndex) => {
            localStorage.setItem('ratinglist', [
                ...unref(ratinglist),
                unref(id)
            ])
            value.value = starIndex + 1
            isSet.value = true
            updateRating(starIndex)
        }

        const getStarItemClasses = (value) => {
            if (unref(hoverItemIndex) !== null && !unref(isSet)) {
                return {
                    'rating-wrapper-stars-item--hover':
                        value <= unref(hoverItemIndex)
                }
            }
        }

        const actualRatingValue = computed(() => {
            const newRatingValue = unref(ratingValue) ? unref(ratingValue) : 0
            if (unref(isSet) && unref(value)) {
                return Number(
                    (
                        (newRatingValue * unref(ratingCount) + unref(value)) /
                        (unref(ratingCount) + 1)
                    ).toFixed(1)
                )
            }
            return Number(newRatingValue.toFixed(1))
        })
        const actualReviewCount = computed(() => {
            if (unref(isSet) && unref(value)) {
                return unref(ratingCount) + 1
            }
            return unref(ratingCount)
        })
        const stars = computed(() => {
            const arr = []
            for (let index = 1; index <= 5; index++) {
                let width
                if (index < unref(actualRatingValue)) {
                    width = 100
                } else if (1 - (index - unref(actualRatingValue)) > 0) {
                    width = (1 - (index - unref(actualRatingValue))) * 100
                } else {
                    width = 0
                }
                arr.push({
                    id: index,
                    width: width.toFixed(2) + '%'
                })
            }
            return arr
        })
        const wrapperClasses = computed(() => ({
            'rating__wrapper--lock': unref(isSet)
        }))

        onMounted(() => {
            if (localStorage.getItem('ratinglist')) {
                ratinglist.value = [
                    ...localStorage.getItem('ratinglist').split(',')
                ]
                isSet.value = unref(ratinglist).includes(unref(id).toString())
            }
        })

        return {
            hoverItemIndex,
            ratinglist,
            value,
            isSet,
            getStarItemClasses,
            wrapperClasses,
            actualReviewCount,
            actualRatingValue,
            stars,
            setRating
        }
    }
})
</script>

<style lang="scss" scoped>
@import './styles/cocktail-rating';
</style>
