/// <reference types="cypress" />

describe('boot', () => {
  afterEach(() => {
    cy.get('[data-cy=shutdown]').click();
  });

  it('should boot when calling `boot`', () => {
    cy.visit('/useIntercom');

    cy.window().should('not.have.property', 'intercomSettings');

    cy.get('[data-cy=boot]').click();
    cy.contains('.intercom-lightweight-app-launcher-icon-open');
    cy.window().should('have.property', 'Intercom');
    cy.window().should('have.deep.property', 'intercomSettings', {
      app_id: 'jcabc7e3',
    });
  });

  it('should boot with seeded data when calling `boot`', () => {
    cy.visit('/useIntercom');

    cy.window().should('not.have.property', 'intercomSettings');

    cy.get('[data-cy=boot-seeded]').click();
    cy.contains('.intercom-lightweight-app-launcher-icon-open');
    cy.window().should('have.property', 'Intercom');
    cy.window().should('have.deep.property', 'intercomSettings', {
      app_id: 'jcabc7e3',
      name: 'Russo',
    });
  });

  it('should disable all methods before calling `boot`', () => {
    cy.visit('/useIntercom');

    cy.get('[data-cy=update]').click();
    cy.get('.intercom-lightweight-app-launcher-icon-open').should(
      'not.be.visible',
    );
    cy.get('[data-cy=update-seeded]').click();
    cy.get('.intercom-lightweight-app-launcher-icon-open').should(
      'not.be.visible',
    );
    cy.get('[data-cy=show]').click();
    cy.get('.intercom-lightweight-app-launcher-icon-open').should(
      'not.be.visible',
    );
  });
});
