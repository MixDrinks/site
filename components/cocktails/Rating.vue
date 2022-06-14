<template>
  <div class="rating" @mouseleave="hoverItem = null">
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
    <div class="rating__value">{{ ratingValue }}</div>
    <div class="rating__count">{{ ratingCount }}</div>
  </div>
</template>

<script>
import { updateRating } from "~~/api";
export default {
  name: "Rating",
  data: () => ({
    hoverItem: null,
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
        if (index < this.ratingValue) {
          width = 1;
        } else if (1 - (index - this.ratingValue) > 0) {
          width = 1 - (index - this.ratingValue);
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
};
</script>

<style lang="scss" scoped>
.rating {
  &__count {
    @include defaultCount;
  }
  display: flex;
  align-items: center;
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
