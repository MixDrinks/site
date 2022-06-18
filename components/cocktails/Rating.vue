<template>
  <div
    class="rating"
    itemprop="aggregateRating"
    itemscope=""
    itemtype="http://schema.org/AggregateRating"
  >
    <div
      class="rating__wrapper"
      @mouseleave="hoverItem = null"
      :class="{ lock: isRatingBeenSet }"
    >
      <div class="rating__star-wrapper star__wrapper">
        <div
          class="star__item"
          v-for="star in stars"
          :key="star.id"
          @mouseover="hoverItem = star.id"
          :class="{ hover: star.id <= hoverItem }"
          @click="setRating(star.id)"
        >
          <div class="star--gray"></div>
          <div class="star--full" :style="'width:' + star.width"></div>
        </div>
      </div>
      <div
        class="rating__value"
        itemprop="ratingValue"
        v-if="!!curentRatingValue"
      >
        {{ curentRatingValue }}
      </div>
      <div
        class="rating__count"
        itemprop="reviewCount"
        v-if="!!curentRatingCount"
      >
        {{ curentRatingCount }}
      </div>
    </div>
    <div class="rating__text" v-if="isRatingBeenSet">Дякуємо що оцінили</div>
  </div>
</template>

<script>
import { updateRating } from "~~/api";
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
      require: true,
    },
    ratingValue: {
      type: [Number, null],
      require: true,
    },
  },
  methods: {
    setRating(value) {
      updateRating(this.curentPage, value);
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
      return this.$nuxt.$route.params.id;
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
    this.isRatingBeenSet = this.ratinglist.includes(this.curentPage);
  },
};
</script>

<style lang="scss" scoped>
.rating {
  &__text {
    @include fontSize16;
    color: $colorBlack;
  }

  &__count {
    @include defaultCount;
  }
  &__wrapper {
    display: flex;
    align-items: center;
    &.lock {
      pointer-events: none;
    }
  }

  &__value {
    color: $colorMain;
    @include fontSize16M;
  }
  &__star-wrapper {
    margin-right: 12px;
  }
  .star {
    &__wrapper {
      display: flex;
      justify-content: space-between;
    }
    &__item {
      width: 16px;
      margin: 0 2px;
      height: 16px;
      position: relative;
      &.hover {
        .star {
          &--gray {
            cursor: pointer;
            background-color: rgba($colorRating, 0.8);
            z-index: 3;
          }
        }
      }
    }
    &--full,
    &--gray {
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      position: absolute;
      mask-size: cover;
      mask-image: url("/img/icons/star.svg");

      transition: background-color $defaultAnimTime;
    }
    &--full {
      z-index: 2;
    }
    &--gray {
      z-index: 1;
      background-color: rgba($colorBlack, 0.3);
    }
    &__wrapper:not(:hover) {
      .star {
        &--full {
          background-color: $colorRating;
        }
      }
    }
  }
}
</style>
