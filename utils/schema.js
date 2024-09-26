export const schemaOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MixDrinks',
    url: 'https://mixdrinks.org/',
    logo: 'https://mixdrinks.org/favicon/apple-touch-icon-180x180.png',
    sameAs: ['https://github.com/MixDrinks'],
    contactPoint: [
        {
            '@type': 'ContactPoint',
            email: 'golovashchenkom@ukr.net',
            contactType: 'customer reviews',
        },
    ],
}
export const schemaWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MixDrinks',
    alternateName: 'mixdrinks',
    url: 'https://mixdrinks.org/',
}