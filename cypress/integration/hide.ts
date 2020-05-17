/// <reference types="cypress" />

describe('hide', () => {
  it('should show when calling `show`', () => {
    cy.visit('/useIntercom');

    cy.get('[data-cy=boot]').click();

    cy.get('[data-cy=show]').click();
    cy.get('.intercom-messenger-frame > iframe').should('be.visible');

    cy.get('[data-cy=hide]').click({ force: true });
    cy.get('.intercom-messenger-frame > iframe').should('not.be.visible');
  });
});
