describe('/login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should have correct input and button', () => {
    cy.contains('Login');
    cy.get('input[placeholder="Enter your email"]');
    cy.get('input[placeholder="Enter your password"]');
    cy.get('button').contains('Login');
  });

  it('should validate correctly', () => {
    cy.get('button').contains('Login').click();
    cy.get('[data-wv-name="validatormessage"]').contains(
      'Please enter your email and try again.',
    );
    cy.get('[data-wv-name="validatormessage"]').contains(
      'Please enter your password and try again.',
    );
    cy.get('input[placeholder="Enter your email"]').type('Formatemailsalah');
    cy.get('button').contains('Login').click();
    cy.get('[data-wv-name="validatormessage"]').contains(
      'Invalid email format, please check and try again.',
    );
  });

  it('should save the token and redirect user to home', () => {
    cy.get('input[placeholder="Enter your email"]').type('email@example.com');
    cy.get('input[placeholder="Enter your password"]').type('password');
    cy.get('button').contains('Login').click();
    cy.window().then((win) => {
      const token = win.localStorage.getItem('token');
      cy.wrap(token).should('exist');
    });
    cy.url().should('include', '/home');
  });
});
