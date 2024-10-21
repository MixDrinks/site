<template>
    <div class="sidebar">
        <header class="sidebar__header header">
            <Logo class="header__logo" />
        </header>
        <ul class="menu">
            <li class="menu__item">
                <NuxtLink :to="`/admin`" class="menu__link link">
                    <span class="link__label"> Головна </span>
                </NuxtLink>
            </li>
            <li class="menu__item">
                <NuxtLink
                    :to="`/admin/${pages.blog.slug}`"
                    class="menu__link link"
                >
                    <span class="link__label"> Блог </span>
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { pages } from '../../utils/pages'

import Logo from '../dump/Logo.vue'

export default defineComponent({
    name: 'Sidebar',

    components: { Logo },

    setup() {
        return {
            pages
        }
    }
})
</script>

<style lang="scss" scoped>
.sidebar {
    padding-left: 16px;
    padding-right: 16px;
    border-right: 1px solid rgb(43, 43, 56);

    &__header {
        min-height: 80px;
    }
}
.header {
    padding: 16px 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(43, 43, 56);

    &__logo {
        width: 100%;
    }
}
.menu {
    padding-top: 16px;
    padding-bottom: 16px;

    &__item {
        &:not(:last-child) {
            margin-bottom: 2px;
        }
    }
}
.link {
    $self: &;
    border-radius: 8px;
    display: block;
    padding: 6px 10px;
    transition: background-color 0.1s;
    &__label {
        color: rgb(116 116 133);
        transition: color 0.1s;
        @include fontSize14M;
    }

    &:hover {
        background-color: rgb(41 48 63 / 68%);

        #{$self}__label {
            color: rgb(255 255 255);
        }
    }

    &.router-link-active {
        pointer-events: none;

        background-color: rgba(108, 121, 148, 0.68);

        #{$self}__label {
            color: rgb(255 255 255);
        }
    }
}
</style>
