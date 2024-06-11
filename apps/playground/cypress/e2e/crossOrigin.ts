/// <reference types="cypress" />

describe('use crossOrigin', () => {
  it('should add attribute to script tag', () => {
    cy.visit('/useIntercomWithCrossOrigin');

    cy.document()
      .get('head script')
      .should('have.attr', 'crossOrigin')
      .should('eq', 'anonymous');
  });
});
