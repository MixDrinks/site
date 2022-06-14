<template>
  <div class="filter">
    <div class="filter__header">
      <div class="filter__title">
        Фільтр <span class="filter__total-count">{{ totalCount }}</span>
      </div>
      <transition name="fate-in" appear>
        <IconBtn
          class="filter__close"
          v-if="!!activeFilter.length"
          direction="top"
          type="short"
          icon="/img/icons/croos.svg"
          :isLink="true"
          href="/"
          @click.native="updateCocktails"
        >
          Закрити всі фільтри
        </IconBtn>
      </transition>
    </div>

    <div class="tag-cloud">
      <transition-group
        class="tag-cloud__list"
        name="fate-in"
        mode="page"
        appear
      >
        <div
          class="tag-cloud__item"
          v-for="filterItem in activeFilter"
          :key="filterItem.id"
        >
          <NuxtLink
            class="tag-cloud__link"
            :to="filterItem.url"
            @click.native="updateCocktails"
          >
            {{ filterItem.name }}
          </NuxtLink>
        </div>
      </transition-group>
    </div>
    <div class="filter__wrapper">
      <NuxtLink
        class="filter__item"
        :class="[{ active: filterItem.active }, { lock: !!!filterItem.count }]"
        v-for="filterItem in listWithURL"
        :key="filterItem.id"
        :to="filterItem.url"
        @click.native="updateCocktails"
      >
        <div class="filter__checkbox"></div>
        <div class="filter__name">
          {{ filterItem.name }}
        </div>
        <div class="filter__count" v-if="!filterItem.active">
          {{ filterItem.count }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import IconBtn from "~~/components/dump/UI/buttons/IconBtn.vue";
export default {
  components: { IconBtn },
  name: "FilterList",
  props: {
    filterList: {
      type: Array,
      required: true,
    },
    tagsCount: {
      type: Object,
      require: true,
    },
    totalCount: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    updateCocktails(payload) {
      this.$emit("updateCocktails", payload);
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
            url = newArr.length ? `?tags=${newArr.join(",")}` : `/`;
            active = true;
          } else {
            url = `?tags=${arrayTags.join(",")},${filterItem.id}`;
          }
        }
        arr.push({
          ...filterItem,
          url: url,
          active: active,
          count: this.tagsCount[filterItem.id],
        });
      });
      arr.reverse().sort((a, b) => (a.count === 0 ? 1 : -1));
      return arr;
    },
    activeFilter() {
      return this.listWithURL.filter((item) => item.active);
    },
  },
};
</script>

<style lang="scss" scoped>
.fate-in-enter-active {
  animation: fade-in $defaultAnimTime;
}
.fate-in-leave-active {
  animation: fade-in $defaultAnimTime reverse;
}

.filter {
  &__total-count {
    display: inline-block;
    padding: 3px 10px 4px;
    border-radius: 20px;
    @include fontSize16M;
    line-height: 1;
    background-color: $colorMain;
    color: $colorWhite;
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: $halfShortMargin;
  }
  &__wrapper {
    max-height: 100vh;
    overflow: auto;
    @include defaultWrapperScroll;
  }
  &__checkbox {
    width: 20px;
    height: 20px;
    margin-right: 10px;

    border: 1px solid $colorMain;
    border-radius: 2px;

    background-color: transparent;
    transition: border $defaultAnimTime, background-color $defaultAnimTime;
  }
  &__title {
    @include fontSize24B;
    color: $colorBlack;
  }
  &__name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @include fontSize18M;
    color: $colorBlack;

    transition: color $defaultAnimTime;
    max-width: calc(100% - 80px);
    &::first-letter {
      text-transform: uppercase;
    }
  }
  &__count {
    @include fontSize16M;
    line-height: 1;
    color: $colorWhite;

    margin-left: 10px;

    padding: 2px 6px 3px;

    background-color: $colorMain;

    border-radius: 20px;
  }
  &__item {
    &.lock {
      pointer-events: none;
      position: relative;

      &::after {
        @include fullPseudoElement;
        z-index: 1;
        background-color: rgba($colorWhite, 0.8);
      }
    }
    display: flex;
    align-items: center;

    padding: 15px 0;
    margin-right: 10px;

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
            @include fullPseudoElement;

            background-image: url("/img/icons/check-mark.svg");
            background-repeat: no-repeat;
            background-position: center;
          }
        }
      }
    }
  }
}
.tag-cloud {
  &__list {
    display: flex;
    flex-wrap: wrap;

    margin: -4px;

    padding: $halfPadding 0;
  }
  &__link {
    @include fontSize14;
    color: $colorMain;

    display: block;
    padding: 3px 20px 3px 5px;

    position: relative;

    border: 1px solid $colorMain;
    border-radius: 4px;

    transition: color $defaultAnimTime, background-color $defaultAnimTime;
    &::first-letter {
      text-transform: uppercase;
    }
    &::after,
    &::before {
      content: "";
      position: absolute;
      height: 1px;
      width: 13px;
      background-color: $colorMain;

      top: calc(50% - 0.5px);
      right: 4px;

      transition: background-color $defaultAnimTime;
    }
    &::after {
      transform: rotate(45deg);
    }
    &::before {
      transform: rotate(-45deg);
    }

    &:hover {
      background-color: $colorMain;
      color: $colorWhite;
    }
    &:hover::after,
    &:hover::before {
      background-color: $colorWhite;
    }
  }
  &__item {
    padding: 4px;
  }
}
</style>
