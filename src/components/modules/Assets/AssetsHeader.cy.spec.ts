import AssetHeader from './AssetsHeader.vue';

describe('AssetHeader', () => {
  beforeEach(() => {
    cy.viewport(1280, 680);
    cy.mount(AssetHeader);
  });

  describe('Toolbars', () => {
    it('should have correct list of buttons', () => {
      cy.getSection('tabletoolbars').within(() => {
        cy.get('.ic-search');
        cy.get('.ic-filter');
        cy.get('.ic-file-history');
        cy.get('[aria-label="+ Register"]');
      });
    });
  });

  describe('Search', () => {
    it('should have input focused when click', () => {
      cy.getSection('buttontrigger').click();
      cy.get('[data-pc-name="inputtext"]')
        .should('be.visible')
        .and('have.focus')
        .and('have.attr', 'placeholder', 'Cari');
    });
    it('should reset the input when reset button is clicked', () => {
      cy.getSection('buttontrigger').click();
      cy.get('[data-pc-name="inputtext"]').type('Testing');
      cy.get('.ic-close').click();
      cy.get('[data-pc-name="inputtext"]').should('have.value', '');
    });

    it('should display the correct tooltip when hovered', () => {
      cy.getSection('tabletoolbars').within(() => {
        cy.get('.ic-search').trigger('mouseover'); // Mouseover method doesn't works?
      });
      cy.get('[data-pc-name="tooltip"]')
        .should('be.visible')
        .and('contain', 'Search');
    });
  });

  describe('Filter', () => {
    it('should turn dark when clicked', () => {
      cy.get('[data-wv-name="buttonfilter"]').click();
      cy.getSection('tabletoolbars').within(() => {
        cy.get('.ic-filter').should('have.class', '.ic-filter-dark');
      });
    });
    it('should display the correct tooltip when hovered', () => {
      cy.getSection('tabletoolbars').within(() => {
        cy.get('.ic-filter').trigger('mouseover'); // Mouseover method doesn't works?
      });
      cy.get('[data-pc-name="tooltip"]')
        .should('be.visible')
        .and('contain', 'Search');
    });
  });

  describe('Changelog', () => {
    it('should display the correct tooltip when hovered', () => {
      cy.getSection('tabletoolbars').within(() => {
        cy.get('.ic-file-history').trigger('mouseover'); // Mouseover method doesn't works?
      });
      cy.get('[data-pc-name="tooltip"]')
        .should('be.visible')
        .and('contain', 'Changelog');
    });
  });
});
