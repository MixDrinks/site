<template>
    <div class="main">
        <SiteHader />
        <div class="main__wrapper">
            <slot />
        </div>
        <SiteFooter />
    </div>
</template>

<script>
import SiteFooter from '~~/components/dump/Footer.vue'
import SiteHader from '~~/components/dump/Header.vue'

import { defineComponent } from 'vue'

export default defineComponent({
    components: {
        SiteFooter,
        SiteHader
    }
})
</script>

<style lang="scss" scoped>
.main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    &__wrapper {
        flex: 1 1 auto;
        margin-top: $halfShortMargin;
        margin-bottom: $halfShortMargin;

        @media (min-width: 1023px) {
            margin-top: $shortMargin;
            margin-bottom: $shortMargin;
        }
    }
}
</style>
