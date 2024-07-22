<template>
    <div class="main">
        <Header />
        <Nuxt class="main__wrapper" />
        <Footer />
    </div>
</template>

<script>
import Footer from '~~/components/dump/footer/Footer'
import Header from '~~/components/dump/header/Header'
export default {
    components: {
        Footer,
        Header,
    },
    head() {
        return {
            script: [
                {
                    src: 'https://www.googletagmanager.com/gtag/js?id=G-8DWKDM4NCR',
                    async: true,
                },
                {
                    innerHTML: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag(js', new Date());
                    gtag('config', 'G-8DWKDM4NCR');
                  `,
                },
            ],
        }
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
