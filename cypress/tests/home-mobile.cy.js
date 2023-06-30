import { default as homePage } from "../support/page_objects/homePage";
import { default as cocktailPage } from "../support/page_objects/cocktailPage";
import forEverySize from "../helpers/for-every-size";

describe("Home screen elements on the different screen resolutions", () => {
  forEverySize(({ viewport }) => {
    beforeEach("Open home screen", () => {
      cy.viewport(viewport);
      cy.visit("/");
    });

    it("can view the cocktails list and open the detailed cocktail screen", () => {
      cy.intercept({
          method: "GET",
          url: "/v2/cocktail/*",
        }).as("cocktail");
      cy.request({
        method: 'GET',
        url: 'https://whale-app-iz3av.ondigitalocean.app/v2/filter?page=0',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((cocktailsList) => {
        const cocktails = cocktailsList.body.cocktails
        cy.get(homePage.sorting.byRate).should("be.visible")
        cy.get(homePage.search).should("be.visible")
        cy.get(homePage.cocktailCard).each(item => {
          const itemText = item.text().trim()
          expect(itemText).to.contain(cocktails[item.index()].name)
        })
        cy.get(homePage.cocktailCard).eq(5).click()

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
  });
});
