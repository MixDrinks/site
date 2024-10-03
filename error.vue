<template>
    <div class="main">
        <SiteHader />
        <div class="main__wrapper">
            <Error404 :error="error" />
        </div>
        <SiteFooter />
    </div>
</template>
<script>
import { defineComponent } from 'vue'

import SiteFooter from '~~/components/dump/Footer.vue'
import SiteHader from '~~/components/dump/Header.vue'
import Error404 from '~~/components/error/404'

export default defineComponent({
    name: 'Error',
    components: {
        Error404,
        SiteFooter,
        SiteHader
    },
    props: {
        error: {
            type: Object,
            default: () => {}
        }
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
