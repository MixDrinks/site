import { computed, reactive, readonly } from "vue";

const state = reactive({
    mainIsOpen: false,
    filtersIsOpenList: [],
    listIsSet: false,
})

function changeMainIsOpen() {
    state.mainIsOpen = !state.mainIsOpen;
}
function updateFiltersIsOpenList(id) {
    if (state.filtersIsOpenList.includes(id)) {
        state.filtersIsOpenList = [...state.filtersIsOpenList.filter(
            (el) => el !== id
        )];
    } else {
        state.filtersIsOpenList.push(id);
    }
}
function setFiltersIsOpenList(list) {
    if (!state.listIsSet) {
        state.filtersIsOpenList = [...list.filter((listItem) => !listItem.isOpen).map(listItem => listItem.id)]
    }
    state.listIsSet = true
}

export const store = readonly({
    getters: {
        isFilterOpen: computed(() => state.mainIsOpen),
        filtersIsOpenList: computed(() => state.filtersIsOpenList),
        filtersListIsSet: computed(() => state.listIsSet),
    },
    actions: {
        changeMainIsOpen,
        updateFiltersIsOpenList,
        setFiltersIsOpenList,
    }
})