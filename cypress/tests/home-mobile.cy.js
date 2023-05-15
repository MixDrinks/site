import { default as homePage } from '../support/page_objects/homePage';
import { default as cocktailPage } from '../support/page_objects/cocktailPage';

const defaultSizes = ['iphone-6', 'ipad-2', 'macbook-13'];

function forEverySize(options) {
    let tests;
    let sizes;
    if (typeof options === 'function') {
        tests = options;
        sizes = defaultSizes;
    } else {
        ({ sizes = defaultSizes, tests } = options);
    }
    sizes.forEach((size) => {
        context(`for ${size} screen size`, () => {
            beforeEach(() => {
                cy.viewport(size);
            });
            tests({ viewport: size });
        });
    });
}

export default forEverySize;

describe("Home screen elements on the different screen resolutions", () => {
forEverySize(({ viewport }) => {

  beforeEach("Open home screen", () => {
    cy.viewport(viewport);
    cy.visit("/");
  });

  it("can view the cocktails list and open the detailed cocktail screen", () => {
    cy.intercept({
        method: "GET",
        url: "/v2/cocktails/full*",
      }).as("cocktail");
    cy.request({
      method: 'GET',
      url: 'https://whale-app-iz3av.ondigitalocean.app/v2/search/cocktails?page=0',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((cocktailsList) => {
      const cocktails = cocktailsList.body.cocktails
      cy.get(homePage.vertical.selector.sorting.byRate).should("be.visible")
      cy.get(homePage.vertical.selector.search).should("be.visible")
      cy.get(homePage.vertical.selector.cocktailCard).each(item => {
        const itemText = item.text().trim()
        expect(itemText).to.contain(cocktails[item.index()].name)
      })
      cy.get(homePage.vertical.selector.cocktailCard).eq(5).click()
  
      cy.wait('@cocktail').then( cocktail => {
        const details = cocktail.response.body;
        const receipt = details.receipt
        const goods = details.goods
        const tools = details.tools
  
        cy.get(cocktailPage.vertical.selector.title).should('contain', details.name)
        cy.get(cocktailPage.vertical.selector.recipeItem).each(listItem => {
          const itemText = listItem.text()
          expect(itemText).to.equal(receipt[listItem.index()])
        })
        cy.get(cocktailPage.vertical.selector.component).find('[data-cy="ingredient"]').each(listItem => {
          const itemText = listItem.text()
          expect(itemText).contains(goods[listItem.index()].name)
        })
        cy.get(cocktailPage.vertical.selector.tools).find('[data-cy="ingredient"]').each(listItem => {
          const itemText = listItem.text()
          expect(itemText).contains(tools[listItem.index()].name)
        })
      })

    })
  });
})
})


