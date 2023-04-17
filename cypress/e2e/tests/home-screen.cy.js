describe("Home screen tests", () => {
  const interceptSorting = ( sortingParam ) => {
    cy.intercept({
      method: "GET",
      url: `/v2/search/cocktails?page=0&${sortingParam}`,
    }).as("sortingApplied");
  }
  beforeEach("Open home screen", () => {
    cy.visit("/");
  });

  it("The cocktails list should be visible", async () => {
    cy.request({
      method: 'GET',
      url: 'https://whale-app-iz3av.ondigitalocean.app/v2/search/cocktails?page=0',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((cocktailsList) => {
      const cocktails = cocktailsList.body.cocktails
      cy.get('.cocktails-body__list .list__item').each(item => {
        const itemText = item.text().trim()
        expect(itemText).to.contain(cocktails[item.index()].name)
      })
    })
  });

  it("items should be reordered after sorting applying", () => {
    interceptSorting("sort=biggest-rate")

    cy.contains(".sorting__list", 'Найкраща оцінка').click();
    cy.contains(".sorting__list", 'Найкраща оцінка').click();

    cy.wait("@sortingApplied").its('response.body').then((body) => {
      const cocktails = body.cocktails
      cy.get('.cocktails-body__list .list__item').each(item => {
        const itemText = item.text().trim()
        expect(itemText).to.contain(cocktails[item.index()].name)
      })
    })

  });

  it("items should be filteres after applying a filter", () => {
    interceptSorting("alcohol-volume=1")

    let firstItemName
    cy.get(".list").find(".cart__name").first().invoke('text').then((itemTitle) => {
      firstItemName = itemTitle
    })

    cy.get('[title="слабоалкогольні"]').find('.filter-list-item__checkbox').click()
    cy.get('[class="filters-tag-cloud-list-item__link nuxt-link-active"]').should('exist')
    cy.get('[title="слабоалкогольні"]').find('.filter-list-item__checkbox').click()

    cy.wait("@sortingApplied").its('response.body').then( (body) => {
      const cocktails = body.cocktails
      cy.get('.cocktails-body__list .list__item').each(item => {
        const itemText = item.text().trim()
        expect(itemText).to.contain(cocktails[item.index()].name)
      })
      cy.get(".list").find(".cart__name").first().should('not.contain', firstItemName)
    });
  });
});
