// store/auth.js
export const state = () => ({
    username: null,
    password: null
})

export const mutations = {
    setUsername(state, username) {
        state.username = username
    },
    setPassword(state, password) {
        state.password = password
    }
}
