describe('/details-asset', () => {
  beforeEach(() => {
    cy.visit('/663ce742f0667d5266d83d66/details-asset');
  });

  it('should have correct title', () => {
    cy.contains('Asset Details');
  });

  it('should render correctly when an asset is found', () => {
    cy.get('#name').should('contain', 'AC Portable Indoor');
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
      .should('contain', 'MacBook Pro');
    cy.contains('Group')
      .parent()
      .find('.font-medium.text-xs')
      .should('contain', 'Room 402');
  });

  it('should display "Item not found" when no asset is found', () => {
    cy.visit('/id-ngaco/details-asset');
    cy.get('.p-4.text-gray-500').should('contain', 'Item not found.');
  });
});
