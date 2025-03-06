<template>
    <div class="admin">admin</div>
</template>

<script>
import { definePageMeta } from '#imports'
import { defineComponent } from 'vue'
import { head } from '~~/utils/head'

export default defineComponent({
    name: 'Admin',

    setup() {
        definePageMeta({
            layout: 'admin',
            middleware: 'auth',
            pageTransition: {
                name: 'none'
            }
        })
        head({
            title: 'Панель адміністратора',
            description: 'Панель адміністратора',
            indexPage: false
        })
    }
})
</script>

<style lang="scss" scoped></style>
