<template>
    <header class="header">
        <div class="header__content header-content" ref="header">
            <Logo />
            <FieldSearch class="header-content__search" />
        </div>
    </header>
</template>

<script>
import { defineComponent } from 'vue'

import Logo from './Logo.vue'
import FieldSearch from './../UI/FieldSearch.vue'
export default defineComponent({
    components: { Logo, FieldSearch },
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
