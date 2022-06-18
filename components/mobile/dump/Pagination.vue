<template>
  <div class="pagination">
    <TextBtn
      class="pagination__load-more"
      v-if="!!nextPage"
      :isLink="!!nextPage"
      :href="nextPage.link"
      @click="updateCocktails({ loadMore: true })"
      rel="nofollow"
    >
      Показати ще {{ limit }}
    </TextBtn>
    <ul class="pagination__list">
      <li class="pagination__item" v-for="page in pagination" :key="page.id">
        <TextBtn
          class="pagination__link"
          v-if="page.type === 'link'"
          :isLink="!!page.link"
          :href="page.link"
          @click.native="updateCocktails()"
        >
          {{ page.title }}
        </TextBtn>
        <span class="pagination__link" :class="page.type" v-else>
          {{ page.title }}
        </span>
      </li>
    </ul>
    <div class="pagination__btns">
      <IconBtn
        class="pagination__prev"
        direction="top"
        icon="/img/icons/arrow.svg"
        :lock="!!!prevPage"
        :isLink="!!prevPage"
        :href="!!prevPage ? prevPage.link : '/'"
        @click.native="updateCocktails()"
        rel="prev"
      >
        Попередня сторінка
      </IconBtn>
      <IconBtn
        class="pagination__next"
        direction="bottom"
        icon="/img/icons/arrow.svg"
        :lock="!!!nextPage"
        :isLink="!!nextPage"
        :href="!!nextPage ? nextPage.link : '/'"
        @click.native="updateCocktails()"
        rel="next"
      >
        Наступна сторінка
      </IconBtn>
    </div>
  </div>
</template>

<script>
import IconBtn from "~~/components/dump/UI/buttons/IconBtn.vue";
import TextBtn from "~~/components/dump/UI/buttons/TextBtn.vue";
export default {
  components: { IconBtn, TextBtn },
  name: "Pagination",
  props: {
    totalItems: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    itemsCount: {
      type: Number,
      required: true,
    },
  },
  methods: {
    updateCocktails(payload) {
      this.$emit("updateCocktails", payload);
    },
  },
  computed: {
    currentPage() {
      if (this.$nuxt.$route.query && this.$nuxt.$route.query.page) {
        return +this.$nuxt.$route.query.page;
      } else {
        return 0;
      }
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
    allPageArr() {
      let allPageArr = [];
      const pageCount = Math.ceil(this.totalItems / this.limit);
      for (let index = 0; index < pageCount; index++) {
        let link =
          index === 0 ? `?${this.query}` : `?page=${index}${this.query}`;
        allPageArr.push({
          title: index + 1,
          type: `link`,
          id: index,
          link: link,
        });
      }
      return allPageArr;
    },
    pagination() {
      let pagination = [];
      let prevPagesArr = [];
      let nextPagesArr = [];
      const differencePaginationIndex = 2;
      const currentPage = this.currentPage;
      const allPageArr = this.allPageArr;
      const dotsObj = {
        title: "...",
        type: "dots",
      };
      const currentPageObj = {
        title: currentPage + 1,
        type: "current",
        id: currentPage,
      };

      if (currentPage > differencePaginationIndex) {
        prevPagesArr.push(allPageArr[0]);
        prevPagesArr.push({
          ...dotsObj,
          id: currentPage - 2,
        });
        prevPagesArr.push(allPageArr[currentPage - 1]);
      } else {
        for (let index = 0; index < currentPage; index++) {
          let link =
            index === 0 ? `?${this.query}` : `?page=${index}${this.query}`;
          prevPagesArr.push({
            title: index + 1,
            type: `link`,
            id: index,
            link: link,
          });
        }
      }
      if (allPageArr.length - currentPage > differencePaginationIndex + 1) {
        nextPagesArr.push(allPageArr[currentPage + 1]);
        nextPagesArr.push({
          ...dotsObj,
          id: currentPage + 2,
        });
        nextPagesArr.push(allPageArr[allPageArr.length - 1]);
      } else {
        for (let index = currentPage + 1; index < allPageArr.length; index++) {
          nextPagesArr.push({
            title: index + 1,
            type: `link`,
            id: index,
            link: `?page=${index}${this.query}`,
          });
        }
      }
      pagination = [...prevPagesArr, currentPageObj, ...nextPagesArr];
      return pagination;
    },
    prevPage() {
      if (this.currentPage != 0) {
        return this.allPageArr[this.currentPage - 1];
      } else {
        return false;
      }
    },
    nextPage() {
      if (this.currentPage != this.allPageArr.length) {
        return this.allPageArr[this.currentPage + 1];
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  &__load-more {
    margin-bottom: $halfShortMargin;
  }
  &__btns {
    display: flex;
    justify-content: space-between;
  }
  &__list {
    margin-bottom: $halfShortMargin;
    display: flex;
    transform: translateX(-50%);
    position: relative;
    left: 50%;
    justify-content: center;
  }
  &__prev {
    margin-right: 8px;
  }
  &__item {
    &:not(:last-child) {
      margin-right: 2px;
    }
  }
  &__link {
    &.dots,
    &.current {
      padding: 4px;

      min-width: 40px;
      min-height: 40px;

      border-radius: 4px;

      display: flex;
      align-items: center;
      justify-content: center;
    }
    &.dots {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='2' viewBox='0 0 16 2' fill='none'%3E%3Cpath d='M0 0H2V2H0V0Z' fill='%23D8D8D8'/%3E%3Cpath d='M7 0H9V2H7V0Z' fill='%23D8D8D8'/%3E%3Cpath d='M14 0H16V2H14V0Z' fill='%23D8D8D8'/%3E%3C/svg%3E");
      mask-position: center;
      mask-repeat: no-repeat;
      background-color: $colorMain;
    }
    &.current {
      @include fontSize18M;
      color: $colorBlack;

      border: 1px solid $colorMain;

      background-color: $colorWhite;
    }
  }
}
</style>
