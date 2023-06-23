import { default as homePage } from "../support/page_objects/homePage";

describe("Home screen tests", () => {
  const interceptSorting = (sortingParam) => {
    cy.intercept({
      method: "GET",
      url: `/v2/filter?${sortingParam}&page=0`,
    }).as("sortingApplied");
  };

  beforeEach("Open home screen", () => {
    cy.visit("/");
  });
  it("items should be reordered after sorting applying", () => {
    interceptSorting("sort=biggest-rate");

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
});
