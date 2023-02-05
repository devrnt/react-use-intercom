/// <reference types="cypress" />

describe('shutdown', () => {
  afterEach(() => {
    cy.get('[data-cy=shutdown]').click();
  });

  it('should shutdown when calling `shutdown`', () => {
    cy.visit('/useIntercom');

    cy.window().should('not.have.property', 'intercomSettings');

    cy.get('[data-cy=boot]').click();
    cy.get('[data-cy=shutdown]').click();
    cy.get('.intercom-lightweight-app-launcher-icon-open').should('not.exist');
  });

  it('should remove keep `window.intercomSettings` when calling `shutdown`', () => {
    cy.visit('/useIntercom');

    cy.window().should('not.have.property', 'intercomSettings');

    cy.get('[data-cy=boot]').click();
    cy.get('[data-cy=shutdown]').click();
    cy.window()
      .its('intercomSettings')
      .should('be.undefined');
    cy.get('.intercom-lightweight-app-launcher-icon-open').should('not.exist');
  });

  it('should remove `app_id` when calling `hardShutdown`', () => {
    cy.visit('/useIntercom');

    cy.window().should('not.have.property', 'intercomSettings');

    cy.get('[data-cy=boot]').click();
    cy.get('[data-cy=shutdown-hard]').click();
    cy.window()
      .its('intercomSettings')
      .should('be.undefined');
    cy.get('.intercom-lightweight-app-launcher-icon-open').should('not.exist');
  });
});
