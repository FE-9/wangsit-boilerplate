import AssetTable from '../AssetsTable.vue';
describe('AssetTable', () => {
  beforeEach(() => {
    cy.viewport(1280, 680);
    cy.mount(AssetTable);
    cy.get('tbody tr', { timeout: 3000 }).should('have.length.greaterThan', 0);
  });

  describe('Header', () => {
    it('should have correct list of buttons', () => {
      cy.getSection('tabletoolbars').within(() => {
        cy.get('.ic-search');
        cy.get('.ic-filter');
        cy.get('.ic-file-history');
        cy.get('[aria-label="+ Register"]');
      });
    });
  });

  describe('Table', () => {
    it('should have correct column header', () => {
      cy.get('thead').within(() => {
        cy.contains('Asset');
        cy.contains('Group');
        cy.contains('Category');
        cy.contains('Brand');
        cy.contains('Model/Type');
        cy.contains('Alias Name');
      });
    });
    it('should correctly handle fetch table data', () => {
      cy.contains('Ac Portable Indoor');
      cy.contains('Menampilkan 1 - 10 dari 12');
      cy.get('table').within(() => {
        cy.get('tbody tr').should('have.length', 10);
      });
    });

    /*
     * (Skipped this test since right now we doesn't have a way to destroy the data fetched)
     * It('should correctly handle error case fetch table data', () => {
     *   cy.get('[data-cy=my-component]').then((componentWrapper) => {
     *     const vm = componentWrapper.__vue__;
     *     vm.myVar.value = 'new value';
     *     *   Cy.get('table').within(() => {
     *     cy.get('tbody tr', { timeout: 3000 }).should('not.have.length');
     *   });
     * });
     */

    it('should paginate data correctly', () => {
      cy.getPcSection('nextpagebutton').click();
      cy.get('table').within(() => {
        cy.get('tbody tr').should('have.length', 2);
      });
    });

    it('should shown correct number of row', () => {
      cy.get('[data-pc-name="rowperpagedropdown"]').contains('10').click();
      cy.get('[aria-label="25"]').click();

      cy.get('table').within(() => {
        cy.get('tbody tr', { timeout: 3000 }).should('have.length', 12);
      });
    });

    it('should have correct single action menus', () => {
      cy.getSection('singleactionbutton').first().click();
      cy.get('#single-action-menu_list').within(() => {
        cy.contains('Detail Asset');
        cy.contains('Edit');
      });
    });

    it('should open form for registering new asset', () => {
      cy.get('button').contains('+ Register').click();
      cy.getSection('dialog-form').should('be.visible');
      cy.getSection('dialog-form').within(() => {
        cy.getSection('dialog-form-title').contains('Register Asset');
      });
    });

    it('should open form for editting new asset', () => {
      cy.getSection('singleactionbutton').first().click();
      cy.get('#single-action-menu_list').within(() => {
        cy.contains('Edit').click();
      });
      cy.getSection('dialog-form').should('be.visible');
      cy.getSection('dialog-form').within(() => {
        cy.getSection('dialog-form-title').contains('Edit Asset');
      });
    });

    it('should open details asset page', () => {
      cy.getSection('singleactionbutton').first().click();
      cy.get('#single-action-menu_list').within(() => {
        cy.contains('Detail Asset').click();
      });
      cy.url().should('include', '/details-asset');
    });
  });
});
