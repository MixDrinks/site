<template>
    <div class="rating">
        <div
            class="rating__wrapper rating-wrapper"
            @mouseleave="hoverItemIndex = null"
            :class="{ 'rating__wrapper--lock': isSet }"
        >
            <div class="rating-wrapper__stars rating-wrapper-stars">
                <div
                    class="rating-wrapper-stars__item rating-wrapper-stars-item"
                    v-for="star in stars"
                    :key="star.id"
                    @mouseover="hoverItemIndex = star.id"
                    :class="{
                        'rating-wrapper-stars-item--hover':
                            star.id <= hoverItemIndex,
                    }"
                    @click="setRating(star.id)"
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
                    mixdrinks
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
                value: value,
            })
            localStorage.setItem('ratinglist', [
                ...this.ratinglist,
                this.curentPage,
            ])
            this.value = value
            this.isSet = true
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
        curentPage() {
            return this.id
        },
        stars() {
            let arr = []
            for (let index = 1; index <= 5; index++) {
                let width
                if (index < this.actualRatingValue) {
                    width = 1
                } else if (1 - (index - this.actualRatingValue) > 0) {
                    width = 1 - (index - this.actualRatingValue)
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
    },
    mounted() {
        if (localStorage.getItem('ratinglist')) {
            this.ratinglist = [...localStorage.getItem('ratinglist').split(',')]
            this.isSet = this.ratinglist.includes(this.curentPage.toString())
        }
    },
}
</script>

<style lang="scss" scoped>
@import './styles/rating';
</style>
