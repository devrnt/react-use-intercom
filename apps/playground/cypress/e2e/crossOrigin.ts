/// <reference types="cypress" />

describe('crossOrigin', () => {
  it('should set the crossorigin attribute on the Messenger script tag', () => {
    cy.visit('/useIntercomWithCrossOrigin');

    cy.get('head script[src*="widget.intercom.io"]').should(
      'have.attr',
      'crossorigin',
      'anonymous',
    );
  });
});
