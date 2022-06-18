<template>
  <div class="filters">
    <div class="filters__header">
      <div class="filters__title">
        Фільтри <span class="filters__total-count">{{ totalCount }}</span>
      </div>
      <transition name="fate-in" appear>
        <IconBtn
          class="filter__close"
          v-if="!!activeFilter.length"
          direction="top"
          type="short"
          icon="/img/icons/croos.svg"
          :isLink="true"
          :href="`?${queryWithoutFilter}`"
          @click.native="updateCocktails"
        >
          Відмінити всі фільтри
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
          :key="filterItem.name"
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
    <div class="filters__wrapper">
      <FilterItem
        class="filters__list"
        v-for="filterItem in listWithURL"
        :key="filterItem.id"
        :filterItem="filterItem"
        :list="filterItem.filterList"
      />
    </div>
  </div>
</template>

<script>
import { filter } from "~~/utils/filter";
import IconBtn from "~~/components/dump/UI/buttons/IconBtn.vue";
import FilterItem from "./FilterItem.vue";
export default {
  components: { IconBtn, FilterItem },
  name: "FilterList",
  props: {
    filterList: {
      type: Object,
      required: true,
    },
    tagsCount: {
      type: Object,
      require: true,
    },
    goodCount: {
      type: Object,
      require: true,
    },
    toolCount: {
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
    filter() {
      return filter;
    },
    query() {
      let temp = "";
      for (let [key, value] of Object.entries(this.$nuxt.$route.query)) {
        if (key != "page") {
          temp = temp + `&${key}=${value}`;
        }
      }
      return temp;
    },
    arrFilterNames() {
      let arr = [];
      this.filter.forEach((el) => {
        arr.push(el.value);
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
    listWithURL() {
      let arr = [];
      this.filter.forEach((filterItem) => {
        const machineValue = filterItem.value;
        const filterListObj = this.filterList[machineValue];
        let newFilterList = [];
        let filterListArr = [];
        let query = "";
        for (let [key, value] of Object.entries(this.$nuxt.$route.query)) {
          if (key != "page" && key != machineValue) {
            query = query + `&${key}=${value}`;
          }
        }
        for (let [key, value] of Object.entries(filterListObj)) {
          filterListArr.push({
            id: key,
            name: value,
          });
        }
        filterListArr.forEach((subfilterItem) => {
          let url = `?${machineValue}=${subfilterItem.id}${query}`;
          let active = false;
          if (this.$nuxt.$route.query[machineValue]) {
            const arrayTags = this.$nuxt.$route.query[machineValue].split(",");
            if (arrayTags.find((item) => item == subfilterItem.id)) {
              const newArr = arrayTags.filter(
                (item) => item != subfilterItem.id
              );
              url = newArr.length
                ? `?${machineValue}=${newArr.join(",")}${query}`
                : `?${query}`;
              active = true;
            } else {
              url = `?${machineValue}=${arrayTags.join(",")},${
                subfilterItem.id
              }${query}`;
            }
          }
          newFilterList.push({
            ...subfilterItem,
            url: url,
            active: active,
            count: this[filterItem.count][subfilterItem.id],
          });
        });
        newFilterList.reverse().sort((a, b) => (a.count === 0 ? 1 : -1));
        arr.push({
          title: filterItem.name,
          id: filterItem.id,
          filterList: [...newFilterList],
        });
      });

      return arr;
    },
    activeFilter() {
      let arr = [];
      this.listWithURL.forEach((el) => {
        arr = [...arr, ...el.filterList];
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
