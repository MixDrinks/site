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
    <div class="pagination__controls pagination-controls">
      <ul class="pagination-controls__list pagination-controls-list">
        <li class="pagination-controls-list__item pagination-controls-list-item" v-for="page in pagination" :key="page.id">
          <TextBtn
            class="pagination-controls-list-item__link"
            v-if="page.type === 'link'"
            :isLink="!!page.link"
            :href="page.link"
            @click.native="updateCocktails()"
          >
            {{ page.title }}
          </TextBtn>
          <span class="pagination-controls-list-item__link" :class="`pagination-controls-list-item__link--${page.type}`" v-else>
            {{ page.title }}
          </span>
        </li>
      </ul>
      <div class="pagination-controls__btns pagination-controls-btns">
        <IconBtn
          class="pagination-controls-btns__item pagination-controls-btns__item--prev"
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
          class="pagination-controls-btns__item pagination-controls-btns__item--next"
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
@import './styles/pagination.scss'
</style>
