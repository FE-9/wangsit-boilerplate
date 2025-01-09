describe('/assets', () => {
  beforeEach(() => {
    cy.visit('/asset');
  });

  it('should have correct breadcrumb', () => {
    cy.getByName('breadcrumb').within(() => {
      cy.contains('Wangs');
      cy.contains('Asset');
    });
  });
});
