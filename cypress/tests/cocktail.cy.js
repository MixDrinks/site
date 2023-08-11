import { default as cocktailPage } from "../support/page_objects/cocktailPage";
describe("A cocktail's screen tests", () => {
  beforeEach("Open the site", () => {
    cy.visit("/");
  });

  it('Check the required elements are shown on the page', () => {
    cy.intercept({
      method: "GET",
      url: "/v2/cocktail/*",
    }).as("cocktail");

    cy.get('[data-cy="cocktailCard"]')
      .should('be.visible')
      .should('have.length.gt', 3)
      .then((cocktails) => {
        const cocktailsArray = cocktails.toArray()
        cy.wrap(Cypress._.sample(cocktailsArray)).click()
      })

    cy.wait('@cocktail').then(({ response: {body: cocktail}}) => {
      cy.get(cocktailPage.title).should('contain', cocktail.name)
      cy.get(cocktailPage.recipeItem).each(listItem => {
        const itemText = listItem.text()
        expect(itemText).to.equal(cocktail.receipt[listItem.index()])
      })
      cy.get(cocktailPage.component).each(listItem => {
        const itemText = listItem.text()
        expect(itemText).contains(cocktail.goods[listItem.index()].name)
      })
      cy.get(cocktailPage.tools).each(listItem => {
        const itemText = listItem.text()
        expect(itemText).contains(cocktail.tools[listItem.index()].name)
      })
    })
  })
});
