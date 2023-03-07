<template>
  <div class="filters">
    <div class="filters__header">
      <div class="filters__title">
        Фільтри <span class="filters__total-count">{{ totalCount }}</span>
      </div>
      <div @click="updateCocktails">
        <transition
          name="fate-in"
          appear
        >
          <IconBtn
            class="filter__close"
            v-if="!!activeFilter.length"
            direction="top"
            type="short"
            icon="/img/icons/croos.svg"
            :isLink="true"
            :href="`?${queryWithoutFilter}`"
          >
            Відмінити всі фільтри
          </IconBtn>
        </transition>
      </div>
    </div>

    <div
      class="tag-cloud"
      @click="updateCocktails"
    >
      <div
        class="tag-cloud__list"
        name="fate-in"
        mode="page"
        appear
      >
        <div
          class="tag-cloud__item"
          v-for="filterItem in activeFilter"
          :key="filterItem.name"
        >
          <NuxtLink
            class="tag-cloud__link"
            :to="filterItem.url"
          >
            {{ filterItem.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="filters__wrapper">
      <FilterItem
        class="filters__list"
        v-for="filterItem in filterListWithUrl"
        :key="filterItem.id"
        :filterItem="filterItem"
        @updateCocktails="updateCocktails"
      />
    </div>
  </div>
</template>

<script>
import IconBtn from "~~/components/dump/UI/buttons/IconBtn.vue";
import FilterItem from "./FilterItem.vue";
export default {
  components: { IconBtn, FilterItem },
  name: "FilterList",
  props: {
    filterList: {
      type: Array,
      required: true,
    },
    totalCount: {
      type: Number,
      default: 0,
    },
    futureCounts: {
      type: Object,
      require: true,
    },
  },
  methods: {
    updateCocktails(payload) {
      this.$emit("updateCocktails", payload);
    },
  },
  computed: {
    query() {
      let temp = "";
      for (let [key, value] of Object.entries(this.$nuxt.$route.query)) {
        if (key != "page") {
          temp = temp + `&${key}=${value}`;
        }
      }
      return temp;
    },
    filterListWithUrl() {
      let arr = [...this.filterList];
      arr.forEach((filter) => {
        const machineValue = filter.queryName;
        const isHaveQuery = !!this.$nuxt.$route.query[machineValue];
        const arrayTags = isHaveQuery
          ? this.$nuxt.$route.query[machineValue].split(",")
          : false;
        let query = "";
        for (let [key, value] of Object.entries(this.$nuxt.$route.query)) {
          if (key != "page" && key != machineValue) {
            query = query + `&${key}=${value}`;
          }
        }
        filter.items.forEach((item) => {
          let url = `?${machineValue}=${item.id}${query}`;
          let active = false;
          if (isHaveQuery) {
            if (arrayTags.find((tag) => tag == item.id)) {
              const newArr = arrayTags.filter((tag) => tag != item.id);
              url = newArr.length
                ? `?${machineValue}=${newArr.join(",")}${query}`
                : `?${query}`;
              active = true;
            } else {
              url = `?${machineValue}=${arrayTags.join(",")},${
                item.id
              }${query}`;
            }
          }
          item.cocktailCount = this.futureCounts[filter.id].find(
            (el) => el.id === item.id
          ).count;
          item.url = url;
          item.active = active;
        });
      });
      return arr;
    },
    arrFilterNames() {
      let arr = [];
      this.filterList.forEach((el) => {
        arr.push(el.queryName);
      });
      return arr;
    },
    queryWithoutFilter() {
      let temp = "";
      for (let [key, value] of Object.entries(this.$nuxt.$route.query)) {
        if (key != "page" && !this.arrFilterNames.includes(key)) {
          temp = temp + `&${key}=${value}`;
        }
      }
      return temp;
    },
    activeFilter() {
      let arr = [];
      this.filterListWithUrl.forEach((el) => {
        arr = [...arr, ...el.items];
      });
      return arr.filter((item) => item.active);
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
.filters {
  &__list {
    &:not(:last-child) {
      padding-bottom: $defaultPadding;
      border-bottom: 1px solid rgba($colorMain, 0.2);
    }
    &:not(:first-child) {
      padding-top: $defaultPadding;
    }
  }
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
  &__title {
    @include fontSize24B;
    color: $colorBlack;
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
