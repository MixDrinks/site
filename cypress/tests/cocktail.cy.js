import { default as cocktailPage } from "../support/page_objects/cocktailPage";
describe("A cocktail's screen tests", () => {
  beforeEach("Open the site", () => {
    cy.visit("/");
  });

  // it('Check the required elements are shown on the page', () => {
  //   cy.intercept({
  //     method: "GET",
  //     url: "/v2/cocktails/full*",
  //   }).as("cocktail");
  //   cy.get(".cocktails-body__list")
  //     .find(".list__item")
  //     .eq(0)
  //     .click()

  //   cy.wait('@cocktail').then( cocktail => {
  //     const details = cocktail.response.body;
  //     const receipt = details.receipt
  //     const goods = details.goods
  //     const tools = details.tools

  //     cy.get(cocktailPage.vertical.selector.title).should('contain', details.name)
  //     cy.get(cocktailPage.vertical.selector.recipeItem).each(listItem => {
  //       const itemText = listItem.text()
  //       expect(itemText).to.equal(receipt[listItem.index()])
  //     })
  //     cy.get(cocktailPage.vertical.selector.component).find('[data-cy="ingredient"]').each(listItem => {
  //       const itemText = listItem.text()
  //       expect(itemText).contains(goods[listItem.index()].name)
  //     })
  //     cy.get(cocktailPage.vertical.selector.tools).find('[data-cy="ingredient"]').each(listItem => {
  //       const itemText = listItem.text()
  //       expect(itemText).contains(tools[listItem.index()].name)
  //     })
  //   })

  // })
});
