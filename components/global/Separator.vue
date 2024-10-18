<template>
    <span class="separator">
        <picture class="cart__picture">
            <source
                srcset="/img/logo.png"
                media="screen and (min-width: 1023px)"
            />
            <source srcset="/img/logo-mob.png" />
            <img
                class="separator__img"
                width="20"
                height="20"
                alt="MixDrinks logo"
                title="MixDrinks logo"
                src="/img/logo-mob.png"
            />
        </picture>
    </span>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Separator'
})
</script>

<style lang="scss" scoped>
@import './styles/separator';
</style>
