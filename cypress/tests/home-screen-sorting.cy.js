import { default as homePage } from "../support/page_objects/homePage";

describe.skip("Home screen tests", () => {
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

    cy.get(homePage.sorting.byRate).click();
    cy.get(homePage.sorting.byRate).click();
    cy.wait("@sortingApplied").then(({ response: {body: {cocktails: cocktails}}}) => {
        cy.get(homePage.cocktailCard).each((item) => {
          const itemText = item.text().trim();
          expect(itemText).to.contain(cocktails[item.index()].name);
        });
      });
  });
});
