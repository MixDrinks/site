import { default as homePage } from "../support/page_objects/homePage";

describe("Home screen tests", () => {
  const interceptFiltering = (filterParam) => {
    cy.intercept({
      method: "GET",
      url: `/v2/filter/${filterParam}?page=0`,
    }).as("sortingApplied");
  };
  beforeEach("Open home screen", () => {
    cy.visit("/");
  });

  it("items should be filtered after applying a low alcohol filter", () => {
    interceptFiltering("alcohol-volume=slaboalkoholni")

    let firstItemName
    cy.get(homePage.vertical.selector.cocktailCard).find(".cart__name").first().invoke('text').then((itemTitle) => {
      firstItemName = itemTitle
    })

    // applying the low alcohol filter
    cy.get(homePage.vertical.selector.filters.lowalcohol).click()
    // checking that proper tag is shown
    cy.get(homePage.vertical.selector.filters.lowalcoholTag).should('be.visible')

    cy.wait("@sortingApplied").its('response.body').then( (body) => {
      const cocktails = body.cocktails
      cy.get(homePage.vertical.selector.cocktailCard).each(item => {
        const itemText = item.text().trim()
        expect(itemText).to.contain(cocktails[item.index()].name)
      })
      // checking that the first element name is changed after applying filters
      cy.get(homePage.vertical.selector.cocktailCard).find(".cart__name").first().should('not.contain', firstItemName)
    });
  });
});
