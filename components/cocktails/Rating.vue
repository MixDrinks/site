<template>
  <div
    class="rating"
    :itemprop="!!curentRatingValue ? 'aggregateRating' : false"
    :itemscope="!!curentRatingValue ? '' : false"
    :itemtype="
      !!curentRatingValue ? 'http://schema.org/AggregateRating' : false
    "
  >
    <div
      class="rating__wrapper rating-wrapper"
      @mouseleave="hoverItem = null"
      :class="{ 'rating__wrapper--lock': isRatingBeenSet }"
    >
      <div class="rating-wrapper__stars rating-wrapper-stars">
        <div
          class="rating-wrapper-stars__item rating-wrapper-stars-item"
          v-for="star in stars"
          :key="star.id"
          @mouseover="hoverItem = star.id"
          :class="{ 'rating-wrapper-stars-item--hover': star.id <= hoverItem }"
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
        class="rating-wrapper__value"
        itemprop="ratingValue"
        v-if="!!curentRatingValue"
      >
        {{ curentRatingValue }}
      </div>
      <div
        class="rating-wrapper__count"
        itemprop="reviewCount"
        v-if="!!curentRatingCount"
      >
        {{ curentRatingCount }}
      </div>
    </div>
    <div
      class="rating__text"
      v-if="isRatingBeenSet"
    >
      Дякуємо, що оцінили
    </div>
  </div>
</template>

<script>
export default {
  name: "Rating",
  data: () => ({
    hoverItem: null,
    ratinglist: [],
    curentRatingCount: 0,
    curentRatingValue: null,
    isRatingBeenSet: false,
  }),
  props: {
    ratingCount: {
      type: Number,
      default: 0,
    },
    ratingValue: {
      type: Number,
      default: 0,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    setRating(value) {
      this.$axios.post(`/v2/cocktails/score?id=${this.curentPage}`, { value: value })
      localStorage.setItem("ratinglist", [...this.ratinglist, this.curentPage]);
      if (this.curentRatingValue) {
        this.curentRatingValue = Number(
          (
            (this.ratingValue * this.ratingCount + value) /
            (this.ratingCount + 1)
          ).toFixed(1)
        );
      } else {
        this.curentRatingValue = value;
      }
      this.curentRatingCount = this.ratingCount + 1;
      this.isRatingBeenSet = true;
    },
  },
  computed: {
    curentPage() {
      return this.id;
    },
    stars() {
      let arr = [];
      for (let index = 1; index <= 5; index++) {
        let width;
        if (index < this.curentRatingValue) {
          width = 1;
        } else if (1 - (index - this.curentRatingValue) > 0) {
          width = 1 - (index - this.curentRatingValue);
        } else {
          width = 0;
        }
        arr.push({
          id: index,
          width: width.toFixed(2) * 100 + "%",
        });
      }
      return arr;
    },
  },
  mounted() {
    this.curentRatingCount = this.ratingCount;
    if (this.ratingValue) {
      this.curentRatingValue = Number(this.ratingValue.toFixed(1));
    }
    if (localStorage.getItem("ratinglist"))
      this.ratinglist = localStorage.getItem("ratinglist").split(",");
    this.isRatingBeenSet = this.ratinglist.includes(this.curentPage.toString());
  },
};
</script>

<style lang="scss" scoped>
@import "./styles/rating";
</style>
