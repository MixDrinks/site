<template>
    <div class="main">
        <Header />
        <div class="main__wrapper">
            <slot />
        </div>
        <Footer />
    </div>
</template>

<script>
import Footer from '~~/components/dump/Footer.vue'
import Header from '~~/components/dump/Header.vue'

import { defineComponent } from 'vue'

export default defineComponent({
    components: {
        Footer,
        Header,
    },
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
