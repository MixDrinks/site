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
    computed: {
        schemaOrganization() {
            return {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'MixDrinks',
                url: 'https://mixdrinks.org/',
                logo: 'https://makeup.com.ua/favicon/apple-touch-icon-180x180.png',
                sameAs: ['https://github.com/MixDrinks'],
                contactPoint: [
                    {
                        '@type': 'ContactPoint',
                        email: 'golovashchenkom@ukr.net',
                        contactType: 'customer reviews',
                    },
                ],
            }
        },
        schemaWebSite() {
            return {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'MixDrinks',
                alternateName: 'mixdrinks',
                url: 'https://mixdrinks.org/',
            }
        },
    },
    head() {
        return {
            script: [
                {
                    type: 'application/ld+json',
                    json: this.schemaOrganization,
                },
                {
                    type: 'application/ld+json',
                    json: this.schemaWebSite,
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
