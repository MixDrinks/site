<template>
    <div class="main">
        <Header />
        <div class="main__wrapper">
            <Error404 :error="error" />
        </div>
        <Footer />
    </div>
</template>
<script>
import Footer from '~~/components/dump/Footer.vue'
import Header from '~~/components/dump/Header.vue'
import Error404 from '~~/components/error/404'
export default {
    components: {
        Error404,
        Footer,
        Header,
    },
    name: 'error',
    props: {
        error: {
            type: Object,
            default: () => {},
        },
    },
}
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