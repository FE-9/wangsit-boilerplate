import AssetForm from './AssetsForm.vue';

describe('AssetForm', () => {
  beforeEach(() => {
    cy.viewport(1280, 680);
  });

  it('should be visible when the visible prop is true', () => {
    cy.mount(AssetForm, {
      props: {
        visible: true,
        asset: undefined,
      },
    });
    cy.getSection('dialog-form').should('be.visible');
  });

  it('should not be visible when the visible prop is false', () => {
    cy.mount(AssetForm, {
      props: {
        visible: false,
        asset: undefined,
      },
    });
    cy.getSection('dialog-form').should('not.exist');
  });

  it('should initialize form fields correctly when editing an asset', () => {
    const asset = {
      group: 'Room 402',
      category: 'Elektronik',
      name: 'Ac Portable Indoor',
      aliasName: 'Portable AC',
      brand: 'Samsung',
      model: 'Ultra 24',
      imageUrl: 'https://placehold.co/600x400',
    };
    cy.mount(AssetForm, {
      props: {
        visible: true,
        asset,
      },
    });
    cy.getSection('dialog-form-title').contains('Edit Asset');
    cy.get('input[placeholder="Enter alias name"').should(
      'have.value',
      asset.aliasName,
    );
    cy.get('div[fieldname="name"').contains(asset.name);
    cy.get('div[fieldname="group"').contains(asset.group);
    cy.get('div[fieldname="brand"').contains(asset.brand);
    cy.get('div[fieldname="model"').contains(asset.model);
    cy.get('div[fieldname="category"').contains(asset.category);
  });

  it('should initialize form fields as empty when registering a new asset', () => {
    cy.mount(AssetForm, {
      props: {
        visible: true,
        asset: undefined,
      },
    });
    cy.getSection('dialog-form-title').contains('Register Asset');
    cy.get('input[placeholder="Enter alias name"').should('have.value', '');
    cy.get('div[fieldname="name"').should('have.text', 'Select name');
    cy.get('div[fieldname="group"').should('have.text', 'Select group');
    cy.get('div[fieldname="brand"').should('have.text', 'Select brand');
    cy.get('div[fieldname="model"').should('have.text', 'Select model/type');
    cy.get('div[fieldname="category"').should('have.text', 'Select category');
  });

  it('should validate mandatory fields', () => {
    cy.mount(AssetForm, {
      props: {
        visible: true,
        asset: undefined,
      },
    });
    cy.get('button').contains('Create').click();
    cy.get('#Grouperror').should('be.visible');
    cy.get('#Nameerror').should('be.visible');
    cy.get('#Branderror').should('be.visible');
    cy.get('#Model\\/Typeerror').should('be.visible');
    cy.get('#Categoryerror').should('be.visible');
    cy.get('input[placeholder="Enter alias name"').type(
      'This sentence has more than 30 characters',
    );
    cy.contains('Max. 30 characters');
  });

  it('should submit the form correctly when registering a new asset', () => {
    cy.mount(AssetForm, {
      props: {
        visible: true,
        asset: undefined,
      },
    });
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
    cy.get('[data-pc-section="message"]').should(
      'contain',
      'Success, asset has been registered', // Why toast component is duplicated in the DOM?
    );
  });

  it('should submit the form correctly when editing an existing asset', () => {
    const asset = {
      group: 'Room 402',
      category: 'Elektronik',
      name: 'Ac Portable Indoor',
      aliasName: 'Portable AC',
      brand: 'Samsung',
      model: 'Ultra 24',
      imageUrl: 'path/to/image.jpg',
    };
    cy.mount(AssetForm, {
      props: {
        visible: true,
        asset,
      },
    });
    cy.get('input[placeholder="Enter alias name"').clear();
    cy.get('input[placeholder="Enter alias name"').type('Updated Alias');
    cy.get('button').contains('Create').click();
    cy.get('[data-pc-section="message"]').should(
      'contain',
      'Success, asset has been edited', // Why toast component is duplicated in the DOM?
    );
  });

  it('should have correct form buttons', () => {
    cy.mount(AssetForm, {
      props: {
        visible: true,
        asset: undefined,
      },
    });
    cy.get('button').contains('Create');
    cy.get('button').contains('Cancel');
    cy.get('button').contains('Clear');
    cy.get('input[type="checkbox"]').should('exist');
  });
});
