describe("search cocktail tests", () => {
    beforeEach('Open home screen', () => {
        cy.visit('/')
    })

    it('search from home screen', () => {
        let searchSuggestion;
        cy.get('.search').type('м')
        cy.get('.search-result-list-item').first().then((searchSug) => {
            searchSuggestion = searchSug.text().trim()
            console.log(searchSuggestion)
            cy.wrap(searchSug).click()
            cy.get('h1').should('contain', searchSuggestion)
          })
    })
})