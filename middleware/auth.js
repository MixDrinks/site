import { defineNuxtRouteMiddleware, navigateTo, useFetch } from 'nuxt/app';
import { unref } from 'vue';

export default defineNuxtRouteMiddleware(async () => {
    const { data } = await useFetch("/api/admin/islogin")

    if (unref(data).isLogin) {
        return
    }
    if (!unref(data).isLogin) {
        return navigateTo("/");
    }
});
