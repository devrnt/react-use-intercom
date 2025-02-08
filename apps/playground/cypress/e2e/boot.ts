/// <reference types="cypress" />

describe('boot', () => {
  beforeEach(() => {
    cy.visit('/useIntercom');

    cy.intercept('https://api-iam.intercom.io/messenger/web/ping').as(
      'intercomPing',
    );
  });

  afterEach(() => {
    cy.get('[data-cy=shutdown]').click();
  });

  it('should boot when calling `boot`', () => {
    cy.window().should('not.have.property', 'intercomSettings');

    cy.get('[data-cy=boot]').click();

    // Wait for the route aliased as 'intercomPing' to respond
    // without changing or stubbing its response
    cy.wait('@intercomPing');

    cy.get('.intercom-lightweight-app-launcher-icon-open').should('exist');
    cy.window().should('have.property', 'Intercom');
    cy.window().should('have.deep.property', 'intercomSettings', {
      app_id: 'jcabc7e3',
    });
  });

  it('should boot with seeded data when calling `boot`', () => {
    cy.window().should('not.have.property', 'intercomSettings');

    cy.get('[data-cy=boot-seeded]').click();

    cy.wait('@intercomPing');

    cy.get('.intercom-lightweight-app-launcher-icon-open').should('exist');
    cy.window().should('have.property', 'Intercom');
    cy.window().should('have.deep.property', 'intercomSettings', {
      app_id: 'jcabc7e3',
      name: 'Russo',
    });
  });

  it('should disable all methods before calling `boot`', () => {
    cy.get('[data-cy=update]').click();
    cy.get('.intercom-lightweight-app-launcher-icon-open').should('not.exist');
    cy.get('[data-cy=update-seeded]').click();

    cy.get('.intercom-lightweight-app-launcher-icon-open').should('not.exist');
    cy.get('[data-cy=show]').click();
    cy.get('.intercom-lightweight-app-launcher-icon-open').should('not.exist');
  });
});
