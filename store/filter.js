export const state = () => ({
  mainIsOpen: false,
  filtersIsOpenList: [],
  listIsSet: false,
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
  SET_FILTER_IS_OPEN_LIST(state, list) {
    if (!state.listIsSet) {
      state.filtersIsOpenList = list.filter((listItem) => !listItem.isOpen).map(listItem => listItem.id)
    }
    state.listIsSet = true

  },
};

export const actions = {
  changeMainIsOpen(ctx) {
    ctx.commit("CHANGE_MAIN_IS_OPEN");
  },
  updateFiltersIsOpenList(ctx, id) {
    ctx.commit("UPDATE_FILTER_IS_OPEN_LIST", id);
  },
  setFiltersIsOpenList(ctx, list) {
    ctx.commit("SET_FILTER_IS_OPEN_LIST", list);
  }
};
export const getters = {
  getMainIsOpen: (state) => state.mainIsOpen,
  getFiltersIsOpenList: (state) => state.filtersIsOpenList,
  getFiltersListIsSet: (state) => state.listIsSet
};
