<template>
    <header class="header">
        <div class="header__content header-content" ref="header">
            <Logo />
            <Search class="header-content__search" />
        </div>
    </header>
</template>

<script>
import { defineComponent } from 'vue'

import Logo from './Logo.vue'
import Search from '../UI/Search.vue'
export default defineComponent({
    components: { Logo, Search },
    name: 'Header',
    data: () => ({
        scrollVerticalvalue: null,
        isMenuShow: true,
        headerHeight: null,
    }),
})
</script>

<style lang="scss" scoped>
@import './styles/header';
</style>
