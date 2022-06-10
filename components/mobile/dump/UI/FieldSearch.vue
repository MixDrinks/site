<template>
  <div class="search" ref="searchField">
    <label class="search__wrapper">
      <div class="search__label label">Пошук</div>
      <input
        class="search__input input"
        type="text"
        v-model="inputValue"
        @click="(event) => inputClick(event)"
        @blur="(event) => inputBlur(event)"
        @input="(event) => searchValues(event)"
      />
    </label>
    <transition name="max-height">
      <div class="search__result result" v-if="inputValue">
        <ul class="result__list">
          <li
            class="result__item"
            v-for="listItem in filteredList"
            :key="listItem.id"
          >
            <NuxtLink :to="`/cocktails/${listItem.id}`" class="result__link">
              {{ listItem.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "FieldSearch",
  data: () => ({
    inputValue: "",
  }),
  props: {
    listSearch: {
      type: Array,
      required: true,
    },
  },
  methods: {
    inputClick() {
      this.$refs.searchField.classList.add("focus");
    },
    inputBlur(event) {
      this.$refs.searchField.classList.remove("focus");
      if (!!!event.target.value) {
        this.$refs.searchField.classList.remove("filled");
      } else {
        this.$refs.searchField.classList.add("filled");
      }
    },
    searchValues() {
      this.$refs.searchField.classList.add("filled");
    },
  },
  computed: {
    filteredList() {
      let arr = [];
      if (!!this.inputValue) {
        arr = this.listSearch.filter((listItem) => {
          return listItem.name
            .toLowerCase()
            .includes(this.inputValue.toLowerCase());
        });
      }
      return arr;
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  &__wrapper {
    position: relative;
    display: block;
  }
  &__label {
    position: absolute;
    left: 0;
    @include fontSize14;
    color: rgba($colorBlack, 0.8);
    top: 50%;
    transform: translateY(-50%);
    transition: top $defaultAnimTime, transform $defaultAnimTime;
  }
  &__input {
    width: 100%;

    border: 0;
    padding: 20px 0 12px;
    box-shadow: inset 0px -2px 0px $colorMain;

    @include fontSize18B;

    color: $colorBlack;
  }
  &:hover {
    .input {
      box-shadow: inset 0px -3px 0px rgba($colorMain, 0.8);
    }
    .label {
      color: $colorBlack;
    }
  }
  &.focus,
  &.filled {
    .label {
      color: $colorBlack;
      top: 0%;
      transform: translateY(0);
    }
  }
  &:not(:hover).filled {
    .input {
      box-shadow: inset 0px -2px 0px $colorMain;
    }
  }
  &__result {
    z-index: 10;

    position: absolute;
    top: 100%;
    width: 100%;
  }
  .result {
    border: 1px solid rgba($colorBlack, 0.1);
    border-radius: 0 0 10px 10px;
    background-color: $colorWhite;
    padding: 16px $defaultPadding;
    &__list {
      max-height: 200px;
      overflow: auto;

      @include defaultWrapperScroll;
    }
    &__link {
      overflow: hidden;
      position: relative;
      @include fontSize16;

      display: block;
      padding: 8px 0;
      margin-right: 20px;

      color: $colorMain;
      &:after {
        content: "";

        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;

        height: 2px;

        background-color: $colorHover;

        transform: translateX(-100%);

        transition: transform $defaultAnimTime;

        z-index: 1;
      }
      &:hover::after {
        transform: translateX(0);
      }
    }
  }
}
.max-height-enter-active {
  animation: max-height $defaultAnimTime;
  overflow: hidden;
}
.max-height-leave-active {
  animation: max-height $defaultAnimTime reverse;
  overflow: hidden;
}
@keyframes max-height {
  0% {
    max-height: 0;
  }
  100% {
    max-height: 232px;
  }
}
</style>
