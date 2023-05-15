
export default {
    name: 'home',
    vertical: {
        selector: {
            sorting: {
                popular: '[data-cy="sorting 1"]',
                byRate: '[data-cy="sorting 2"]',
            },
            filters: {
                lowalcohol: '[title="слабоалкогольні"]',
                lowalcoholTag: '[data-cy="filterTag 1"]'
            },
            cocktailCard: '[data-cy="cocktailCard"]',
            search: '.search',
            searchSuggestions: '.search-result-list-item'
        }
    }
}
