import {default as homePage} from '../support/page_objects/homePage'

describe("search cocktail tests", () => {
    beforeEach('Open home screen', () => {
        cy.visit('/')
    })

    it('search from home screen', () => {
        let searchSuggestion;
        cy.get(homePage.search).type('м')
        cy.get(homePage.searchSuggestions).first().then((searchSug) => {
            searchSuggestion = searchSug.text().trim()
            console.log(searchSuggestion)
            cy.wrap(searchSug).click()
            cy.get('h1').should('contain', searchSuggestion)
          })
    })
})