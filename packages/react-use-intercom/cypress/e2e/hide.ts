/// <reference types="cypress" />

describe('hide', () => {
  it('should hide when calling `hide`', () => {
    cy.visit('/useIntercom');

    cy.get('[data-cy=boot]').click();

    cy.get('[data-cy=show]').click();
    cy.get('iframe[name="intercom-messenger-frame"]').should('be.visible');

    cy.get('[data-cy=hide]').click();
    cy.get('iframe[name="intercom-messenger-frame"]').should('not.be.visible');
  });
});
