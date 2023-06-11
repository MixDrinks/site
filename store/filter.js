export const state = () => ({
  mainIsOpen: false,
  filtersIsOpenList: [],
  scrollTop: 0,
});

export const mutations = {
  CHANGE_MAIN_IS_OPEN(state) {
    state.mainIsOpen = !state.mainIsOpen;
  },
  UPDATE_FILTER_IS_OPEN_LIST(state, id) {
    if (state.filtersIsOpenList.includes(id)) {
      state.filtersIsOpenList = state.filtersIsOpenList.filter(
        (el) => el != id
      );
    } else {
      state.filtersIsOpenList.push(id);
    }
  },
  UPDATE_SCROLL_TOP(state, value) {
    state.scrollTop = value;
  },
};

export const actions = {
  changeMainIsOpen(ctx) {
    ctx.commit("CHANGE_MAIN_IS_OPEN");
  },
  updateFiltersIsOpenList(ctx, id) {
    ctx.commit("UPDATE_FILTER_IS_OPEN_LIST", id);
  },
  updateScrollTop(ctx, value) {
    ctx.commit("UPDATE_SCROLL_TOP", value);
  },
};
export const getters = {
  getMainIsOpen: (state) => state.mainIsOpen,
  getFiltersIsOpenList: (state) => state.filtersIsOpenList,
  getScrollTop: (state) => state.scrollTop,
};
