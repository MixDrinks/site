<template>
    <div class="rating">
        <div
            class="rating__wrapper rating-wrapper"
            @mouseleave="hoverItemIndex = null"
            :class="wrapperClasses"
        >
            <div class="rating-wrapper__stars rating-wrapper-stars">
                <div
                    class="rating-wrapper-stars__item rating-wrapper-stars-item"
                    v-for="(star, starIndex) in stars"
                    :key="`rating-wrapper-stars__item-${starIndex}`"
                    @mouseover="hoverItemIndex = starIndex"
                    :class="getStarItemClasses(starIndex)"
                    @click="setRating(starIndex)"
                >
                    <div class="rating-wrapper-stars-item__start--gray"></div>
                    <div
                        class="rating-wrapper-stars-item__start--full"
                        :style="'width:' + star.width"
                    ></div>
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
                <span class="rating-wrapper__hidden" itemprop="bestRating">
                    5
                </span>
                <span class="rating-wrapper__hidden" itemprop="author">
                    MixDrinks
                </span>
            </div>
        </div>
        <div class="rating__text" v-if="isSet">Дякуємо, що оцінили</div>
    </div>
</template>

<script>
export default {
    name: 'Rating',
    data: () => ({
        hoverItemIndex: null,
        ratinglist: [],
        value: null,
        isSet: false,
    }),
    props: {
        ratingCount: {
            type: Number,
            default: 0,
        },
        ratingValue: {
            type: Number,
            default: null,
        },
        id: {
            type: Number,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
    },
    methods: {
        setRating(value) {
            this.$axios.post(`/cocktail/${this.slug}/score`, {
                value: value + 1,
            })
            localStorage.setItem('ratinglist', [...this.ratinglist, this.id])
            this.value = value + 1
            this.isSet = true
        },
        getStarItemClasses(value) {
            if (this.hoverItemIndex !== null) {
                return {
                    'rating-wrapper-stars-item--hover':
                        value <= this.hoverItemIndex,
                }
            }
        },
    },
    computed: {
        actualRatingValue() {
            const ratingValue = this.ratingValue ? this.ratingValue : 0
            if (this.isSet && this.value) {
                return Number(
                    (
                        (ratingValue * this.ratingCount + this.value) /
                        (this.ratingCount + 1)
                    ).toFixed(1)
                )
            }
            return Number(ratingValue.toFixed(1))
        },
        actualReviewCount() {
            if (this.isSet && this.value) {
                return this.ratingCount + 1
            }
            return this.ratingCount
        },
        stars() {
            let arr = []
            for (let index = 0; index < 5; index++) {
                let width
                if (index + 1 < this.actualRatingValue) {
                    width = 1
                } else if (1 - (index - this.actualRatingValue) > 0) {
                    width = 0 - (index - this.actualRatingValue)
                } else {
                    width = 0
                }
                arr.push({
                    id: index,
                    width: width.toFixed(2) * 100 + '%',
                })
            }
            return arr
        },
        wrapperClasses() {
            return { 'rating__wrapper--lock': this.isSet }
        },
    },
    mounted() {
        if (localStorage.getItem('ratinglist')) {
            this.ratinglist = [...localStorage.getItem('ratinglist').split(',')]
            this.isSet = this.ratinglist.includes(this.id.toString())
        }
    },
}
</script>

<style lang="scss" scoped>
@import './styles/rating';
</style>
