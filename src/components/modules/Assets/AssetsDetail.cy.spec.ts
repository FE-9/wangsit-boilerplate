import AssetDetail from './AssetsDetail.vue';

describe('AssetDetail', () => {
  beforeEach(() => {
    cy.mount(AssetDetail); // Find out how to inject id routes params with cypress
  });

  it('should render correctly when an asset is found', () => {
    cy.get('#name').should('contain', 'Ac Portable Indoor');
    cy.get('#lastModifier').should('contain', 'ASDF Tag Samurai V2');
    cy.get('#lastModifier').should('contain', '2021-11-17 14:00:00');
    cy.contains('Brand')
      .parent()
      .find('.font-medium.text-xs')
      .should('contain', 'Samsung');
    cy.contains('Category')
      .parent()
      .find('.font-medium.text-xs')
      .should('contain', 'Elektronik');
    cy.contains('Model/Type')
      .parent()
      .find('.font-medium.text-xs')
      .should('contain', 'Ultra 24');
    cy.contains('Group')
      .parent()
      .find('.font-medium.text-xs')
      .should('contain', 'Room 402');
  });

  it('should display "Item not found" when no asset is found', () => {
    cy.mount(AssetDetail, {
      props: {
        id: 'nonexistent-id',
      },
    });

    cy.get('.p-4.text-gray-500').should('contain', 'Item not found.');
  });
});
