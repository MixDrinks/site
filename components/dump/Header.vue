<template>
    <header class="header">
        <div ref="header" class="header__content header-content">
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
    name: 'SiteHader',
    components: { Logo, Search },
    data: () => ({
        scrollVerticalvalue: null,
        isMenuShow: true,
        headerHeight: null
    })
})
</script>

<style lang="scss" scoped>
@import './styles/header';
</style>
