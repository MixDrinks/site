<template>
  <div class="filter">
    <div class="filter__title">Фільтр</div>
    <div class="filter__wrapper">
      <NuxtLink
        class="filter__item"
        :class="{ active: filterItem.active }"
        v-for="filterItem in listWithURL"
        :key="filterItem.id"
        :to="filterItem.url"
      >
        <div class="filter__checkbox"></div>
        <div class="filter__name">
          {{ filterItem.name }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterList",
  props: {
    filterList: {
      type: Array,
      required: true,
    },
  },
  computed: {
    listWithURL() {
      let arr = [];
      this.filterList.forEach((filterItem) => {
        let url = `?tags=${filterItem.id}`;
        let active = false;
        if (this.$nuxt.$route.query.tags) {
          const arrayTags = this.$nuxt.$route.query.tags.split(",");
          if (arrayTags.find((item) => item == filterItem.id)) {
            const newArr = arrayTags.filter((item) => item != filterItem.id);
            url = newArr.length
              ? `?tags=${newArr.join(",")}`
              : `/${this.$nuxt.$route.path}`;
            active = true;
          } else {
            url = `?tags=${arrayTags.join(",")},${filterItem.id}`;
          }
        }
        arr.push({
          ...filterItem,
          url: url,
          active: active,
        });
      });

      return arr;
    },
  },
};
</script>

<style lang="scss" scoped>
.filter {
  &__checkbox {
    width: 20px;
    height: 20px;
    margin-right: 10px;

    border: 1px solid $colorBlack;
    border-radius: 5px;

    background-color: transparent;
    transition: border $defaultAnimTime, background-color $defaultAnimTime;
  }
  &__title {
    @include fontSize24B;
    color: $colorBlack;

    margin-bottom: $halfShortMargin;
  }
  &__name {
    @include fontSize18M;
    color: $colorBlack;

    transition: color $defaultAnimTime;

    &::first-letter {
      text-transform: uppercase;
    }
  }
  &__item {
    display: flex;
    align-items: center;

    padding: 15px 0;

    cursor: pointer;
    &:hover,
    &:focus {
      .filter {
        &__checkbox {
          border: 1px solid $colorMain;
          background-color: rgba($colorMain, 0.2);
        }
        &__name {
          color: $colorMain;
        }
      }
    }
    &.active {
      .filter {
        &__checkbox {
          border: 1px solid $colorMain;
          background-color: $colorMain;

          position: relative;
          &::before {
            content: "";

            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;

            background-image: url("/img/icons/check-mark.svg");
            background-repeat: no-repeat;
            background-position: center;
          }
        }
      }
    }
  }
}
</style>
