/// <reference path="../support/index.d.ts" />

describe('show', () => {
  it('should show when calling `show`', () => {
    cy.visit('/useIntercom');

    cy.get('[data-cy=boot]').click();

    cy.get('[data-cy=show]').click();
    cy.get('.intercom-messenger-frame > iframe').should('be.visible');
  });
});

describe('showMessages', () => {
  it('should show when calling `showMessages`', () => {
    cy.visit('/useIntercom');

    cy.get('[data-cy=boot]').click();

    cy.get('[data-cy=show-messages]').click();
    cy.get('.intercom-messenger-frame > iframe').should('be.visible');

    cy.get('[data-cy=hide]').click({ force: true });
    cy.get('.intercom-messenger-frame > iframe').should('not.exist');
  });
});

describe('showNewMessage', () => {
  it('should show new message `showNewMessage`', () => {
    cy.visit('/useIntercom');

    cy.get('[data-cy=boot]').click();

    cy.get('[data-cy=show-new-messages]').click();

    cy.get('[name="intercom-messenger-frame"]')
      .iframe('[aria-label=Back]')
      .should('exist');
  });

  it('should show new message with content when calling `showNewMessage`', () => {
    cy.visit('/useIntercom');

    cy.get('[data-cy=boot]').click();

    cy.get('[data-cy=show-messages-content]').click();
    cy.wait(1000);

    cy.get('[name="intercom-messenger-frame"]')
      .iframe('textarea[name="message"]')
      .should('exist');
  });
});
