<template>
  <div class="filters">
    <div
      class="filters__main"
      :class="{ 'filters__main--hidden': !isFilterOpen }"
    >
      <div class="filters__header filters-header">
        <div class="filters-header__title filters-header-title">
          Фільтри
          <span class="filters-header-title__count">{{ totalCount }}</span>
        </div>
        <transition
          name="fate-in"
          appear
        >
          <IconBtn
            class="filters-header__close"
            v-show="activeFilter.length"
            direction="top"
            type="short"
            icon="/img/icons/trash.svg"
            :href="`${queryWithoutFilter}`"
            @click="updateCocktails"
          >
            Відмінити всі фільтри
          </IconBtn>
        </transition>
      </div>

      <div
        class="filters__tag-cloud filters-tag-cloud"
        @click="updateCocktails"
      >
        <transition-group
          class="filters-tag-cloud__list filters-tag-cloud-list"
          name="fate-in"
          mode="page"
          appear
        >
          <div
            class="filters-tag-cloud-list__item filters-tag-cloud-list-item"
            v-for="filterItem in activeFilter"
            :key="filterItem.name"
            :data-cy="`filterTag ${filterItem.id}`"
          >
            <NuxtLink
              class="filters-tag-cloud-list-item__link"
              :to="filterItem.url"
            >
              {{ filterItem.name }}
            </NuxtLink>
          </div>
        </transition-group>
      </div>
      <div
        class="filters__wrapper filters-wrapper"
        ref="filtersWrapper"
      >
        <FilterItem
          class="filters-wrapper__item"
          v-for="filterItem in filterListWithUrl"
          :key="filterItem.id"
          :filterItem="filterItem"
          @updateCocktails="updateCocktails"
        />
      </div>
    </div>
    <div
      class="filters__btn"
      @click="changeFilterIsOpen"
    >
      <span v-if="isFilterOpen">Застосувати</span>
      <span v-else>Фільтр</span>
    </div>
    <transition name="opacity">
      <div
        class="filters__background"
        v-if="isFilterOpen"
        @click="changeFilterIsOpen"
      ></div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import IconBtn from "~~/components/dump/UI/buttons/IconBtn";
import FilterItem from "./FilterItem";
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
      required: true,
    },
  },
  mounted() {
    this.$refs.filtersWrapper.addEventListener("scroll", this.setScrollTop);
    this.$refs.filtersWrapper.scrollTo(0, this.scrollTopValue);
  },
  beforeDestroy() {
    this.$refs.filtersWrapper.removeEventListener("scroll", this.setScrollTop);
  },
  methods: {
    setScrollTop() {
      this.updateScrollTop(this.$refs.filtersWrapper.scrollTop);
    },
    updateCocktails(payload) {
      this.$emit("updateCocktails", payload);
    },
    ...mapActions("filter", {
      changeFilterIsOpen: "changeMainIsOpen",
      updateScrollTop: "updateScrollTop",
    }),
  },
  computed: {
    ...mapGetters("filter", {
      isFilterOpen: "getMainIsOpen",
      scrollTopValue: "getScrollTop",
    }),
    filterListWithUrl() {
      let arr = [...this.filterList];
      arr.forEach((filter) => {
        filter.items.forEach((item) => {
          const curentItem = this.futureCounts[filter.id].find(
            (el) => el.id === item.id
          );
          item.url = `/${curentItem.query}`;
          item.cocktailCount = curentItem.count;
          item.active = curentItem.isActive;
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
      return `/?${temp}`;
    },
    activeFilter() {
      const arr = this.filterListWithUrl.map((el) => el.items).flat();
      return arr.filter((item) => item.active);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./styles/filter-list";
</style>
