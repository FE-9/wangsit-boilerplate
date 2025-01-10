describe('/assets', () => {
  beforeEach(() => {
    cy.visit('/assets');
  });

  it('should have correct breadcrumb', () => {
    cy.getByName('breadcrumb').within(() => {
      cy.contains('Wangs');
      cy.contains('Asset');
    });
  });

  it('should have fetch the data again when the close button on search is clicked', () => {
    cy.getSection('buttontrigger').click();
    cy.get('[data-pc-name="inputtext"]').type('Testing');
    cy.getSection('collapsebutton').click();
    cy.get('table').within(() => {
      cy.get('tbody tr').should('have.length', 0);
    });
  });

  it('should have register a new asset correctly', () => {
    cy.get('button').contains('+ Register').click();
    cy.get('input[placeholder="Enter alias name"').type('New Alias');
    cy.get('div[fieldname="group"').click();
    cy.getPcSection('list').within(() => {
      cy.contains('Room 402').click();
    });
    cy.get('div[fieldname="category"').click();
    cy.getPcSection('list').within(() => {
      cy.contains('Elektronik').click();
    });
    cy.get('div[fieldname="name"').click();
    cy.getPcSection('list').within(() => {
      cy.contains('Kompor').click();
    });
    cy.get('div[fieldname="brand').click();
    cy.getPcSection('list').within(() => {
      cy.contains('Samsung').click();
    });
    cy.get('div[fieldname="model').click();
    cy.getPcSection('list').within(() => {
      cy.contains('Ultra 24').click();
    });
    cy.get('button').contains('Create').click();
    cy.get('[data-pc-name="toast"]')
      .should('be.visible')
      .and('contain.text', 'Berhasil! Success, asset has been registered');
  });

  it('should have edit an new asset correctly', () => {
    cy.getSection('singleactionbutton').first().click();
    cy.get('#single-action-menu_list').within(() => {
      cy.contains('Edit').click();
    });
    cy.get('input[placeholder="Enter alias name"').clear();
    cy.get('input[placeholder="Enter alias name"').type('Updated Alias');
    cy.get('button').contains('Create').click();
    cy.get('[data-pc-name="toast"]')
      .should('be.visible')
      .and('contain.text', 'Berhasil! Success, asset has been edited');
    cy.get('button').contains('Create').click();
  });
});
