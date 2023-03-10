<template>
  <div class="filters">
    <div
      class="filters__main"
      :class="{'filters__main--hidden': !isFilterOpen}"
      >
      <div class="filters__header filters-header">
        <div class="filters-header__title filters-header-title">
          Фільтри <span class="filters-header-title__count">{{ totalCount }}</span>
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
            icon="/img/icons/croos.svg"
            :isLink="true"
            :href="`?${queryWithoutFilter}`"
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
      <div class="filters__wrapper filters-wrapper">
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
      @click="isFilterOpen = !isFilterOpen"
    >
      <span v-if="isFilterOpen">Закрити</span>
      <span v-else>Фільтр</span>
    </div>
    <transition name="opacity">
      <div
        class="filters__background"
        v-if="isFilterOpen"
        @click="isFilterOpen = !isFilterOpen"
      ></div>
    </transition>
  </div>
</template>

<script>
import IconBtn from "~~/components/dump/UI/buttons/IconBtn.vue";
import FilterItem from "./FilterItem.vue";
export default {
  components: { IconBtn, FilterItem },
  name: "FilterList",
  data: () => ({
    isFilterOpen: false,
  }),
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
      const arr = this.filterListWithUrl.map(el => el.items).flat()
      return arr.filter((item) => item.active)
    },
  },
};
</script>

<style lang="scss" scoped>
@import './styles/filter-list'
</style>
