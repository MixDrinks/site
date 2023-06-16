import { default as homePage } from "../support/page_objects/homePage";

describe("Home screen tests", () => {
  const interceptSorting = (sortingParam) => {
    cy.intercept({
      method: "GET",
      url: `/v2/filter?${sortingParam}*`,
    }).as("sortingApplied");
  };
  const interceptFiltering = (filterParam) => {
    cy.intercept({
      method: "GET",
      url: `/v2/filter/${filterParam}?page=0`,
    }).as("sortingApplied");
  };
  beforeEach("Open home screen", () => {
    cy.visit("/");
  });

  it.only("items should be reordered after sorting applying", () => {
    interceptSorting("sort=biggest-rate");

    cy.get(homePage.vertical.selector.sorting.byRate).click();
    cy.get(homePage.vertical.selector.sorting.byRate).click();
    cy.get(homePage.vertical.selector.sorting.byRate).click();
    cy.wait("@sortingApplied")
      .its("response.body")
      .then((body) => {
        const cocktails = body.cocktails;
        cy.get(homePage.vertical.selector.cocktailCard).each((item) => {
          const itemText = item.text().trim();
          expect(itemText).to.contain(cocktails[item.index()].name);
        });
      });
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
    // applying the low alcohol filter again because when it clicked programatically the request is not sent
    cy.get(homePage.vertical.selector.filters.lowalcohol).click()

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
