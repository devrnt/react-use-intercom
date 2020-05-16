/// <reference types="cypress" />

context('provider', () => {
  it('should render children', () => {
    cy.visit('/provider');

    cy.get('p').should('be.visible');
  });
});
