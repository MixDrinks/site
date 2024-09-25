import { sendRedirect } from 'h3'
import { defineNuxtPlugin, useRoute } from "nuxt/app";

export default defineNuxtPlugin(nuxtApp => {
    const interceptFetch = async (url, options = {}) => {
        const route = useRoute();

        options.headers = {
            ...options.headers,
            'x-user-path': route.path,
            'Content-Type': 'application/json',
        };

        const response = await $fetch(url, {
            credentials: 'include',
            ...options
        });

        if (response.redirect) {
            sendRedirect(nuxtApp.ssrContext?.event, response.redirect, 301)
        }

        return response;
    }
    nuxtApp.provide('fetchWIXUP', interceptFetch)
})