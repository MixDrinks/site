
import { computed, reactive, readonly } from 'vue'

const state = reactive({
    isAuth: false
})

function updateUserAuth(value) {
    state.isAuth = value
}

export const authStore = readonly({
    getters: {
        isAuth: computed(() => state.isAuth)
    },
    actions: {
        updateUserAuth
    }
})
