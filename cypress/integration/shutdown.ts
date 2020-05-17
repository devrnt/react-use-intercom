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
    cy.get('.intercom-lightweight-app-launcher-icon-open').should(
      'not.be.visible',
    );
  });

  it('should keep `app_id` when calling `shutdown`', () => {
    cy.visit('/useIntercom');

    cy.window().should('not.have.property', 'intercomSettings');

    cy.get('[data-cy=boot]').click();
    cy.get('[data-cy=shutdown]').click();
    cy.window().should('have.deep.property', 'intercomSettings', {
      app_id: 'jcabc7e3',
    });
    cy.get('.intercom-lightweight-app-launcher-icon-open').should(
      'not.be.visible',
    );
  });

  it('should remove `app_id` when calling `hardShutdown`', () => {
    cy.visit('/useIntercom');

    cy.window().should('not.have.property', 'intercomSettings');

    cy.get('[data-cy=boot]').click();
    cy.get('[data-cy=shutdown-hard]').click();
    cy.window()
      .its('intercomSettings')
      .should('be.undefined');
    cy.get('.intercom-lightweight-app-launcher-icon-open').should(
      'not.be.visible',
    );
  });
});
