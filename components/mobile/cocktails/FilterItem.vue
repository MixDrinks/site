<template>
  <div class="filter">
    <div class="filter__header">
      <div class="filter__title">{{ filterItem.title }}</div>
      <div
        class="filter__toggler"
        :class="{ close: isCloseFilter.includes(filterItem.id) }"
        @click="toggleList(filterItem.id)"
      ></div>
    </div>
    <transition name="max-height">
      <div
        class="filter__wrapper"
        v-if="!isCloseFilter.includes(filterItem.id)"
      >
        <div class="filter__search search" :class="{ filled: !!searchValue }">
          <label class="search__wrapper">
            <div class="search__label label">Пошук</div>
            <input
              ref="searchInput"
              class="search__input input"
              type="text"
              v-model="searchValue"
            />
          </label>
        </div>
        <div class="filter__items">
          <div v-for="filterItem in listSearch" :key="filterItem.id">
            <NuxtLink
              rel="tag"
              v-if="!!filterItem.count"
              class="filter__item"
              :class="{ active: filterItem.active }"
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
            <div v-else class="filter__item lock">
              <div class="filter__checkbox"></div>
              <div class="filter__name">
                {{ filterItem.name }}
              </div>
              <div class="filter__count">
                {{ filterItem.count }}
              </div>
            </div>
          </div>
          <div class="filter__text" v-if="listSearch.length === 0">
            нічого не знайдено
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "FilterItem",
  data: () => ({
    isCloseFilter: [],
    searchValue: "",
  }),
  methods: {
    toggleList(id) {
      if (this.isCloseFilter.includes(id)) {
        this.isCloseFilter = this.isCloseFilter.filter((el) => el != id);
      } else {
        this.isCloseFilter.push(id);
      }
    },
    updateCocktails(payload) {
      this.$emit("updateCocktails", payload);
    },
  },
  computed: {
    listSearch() {
      if (!!this.searchValue) {
        let arr = [];
        arr = this.list.filter((listItem) => {
          return listItem.name
            .toLowerCase()
            .includes(this.searchValue.toLowerCase());
        });
        return arr;
      } else {
        return this.list;
      }
    },
  },
  props: {
    filterItem: {
      type: Object,
      require: true,
    },
    list: {
      type: Array,
      require: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.max-height-enter-active {
  animation: max-height $defaultAnimTime;
}
.max-height-leave-active {
  animation: max-height $defaultAnimTime reverse;
}
.filter {
  .search {
    &__wrapper {
      position: relative;
      display: block;
    }
    &__label {
      position: absolute;
      left: 0;
      @include fontSize14;
      color: rgba($colorMain, 0.8);
      top: 50%;
      transform: translateY(-50%);
      transition: top $defaultAnimTime, transform $defaultAnimTime;
    }
    &__input {
      width: 100%;

      border: 0;
      padding: 20px 0 7px;
      box-shadow: inset 0px -2px 0px $colorMain;

      @include fontSize16M;

      color: $colorMain;
    }
    &:hover {
      .input {
        box-shadow: inset 0px -3px 0px rgba($colorMain, 0.8);
      }
      .label {
        color: $colorMain;
      }
    }
    &.filled {
      .label {
        top: 0%;
        transform: translateY(0);
      }
    }
    &:not(:hover).filled {
      .input {
        box-shadow: inset 0px -2px 0px $colorMain;
      }
    }
  }
  &__text {
    @include fontSize14;
    color: $colorMain;
  }
  &__search {
    margin-bottom: $halfPadding;
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__toggler {
    position: relative;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background-color: $colorMain;
    &:hover {
      background-color: $colorHover;
    }
    &::after,
    &::before {
      content: "";
      position: absolute;
      background-color: $colorWhite;
      width: 8px;
      height: 2px;
      top: calc(50% - 1px);

      transition: transform $defaultAnimTime;

      display: block;
    }
    &::after {
      transform: rotate(-45deg);
      left: calc(50% - 2px);
    }
    &::before {
      transform: rotate(45deg);
      left: calc(50% - 6px);
    }
    &.close {
      &::after {
        transform: rotate(45deg);
      }
      &::before {
        transform: rotate(-45deg);
      }
    }
  }
  &__title {
    @include fontSize18B;
    color: $colorBlack;
  }
  &__wrapper {
    margin-top: $halfPadding;
  }
  &__items {
    max-height: 50vh;
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

  &__name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @include fontSize14;
    color: $colorBlack;

    transition: color $defaultAnimTime;
    max-width: calc(100% - 80px);
    &::first-letter {
      text-transform: uppercase;
    }
  }
  &__count {
    @include defaultCount;
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

    padding: 8px 0;
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
</style>
