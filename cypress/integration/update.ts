/// <reference types="cypress" />

describe('update', () => {
  afterEach(() => {
    cy.get('[data-cy=shutdown]').click();
  });

  it('should update with data when calling `update`', () => {
    cy.visit('/useIntercom');

    cy.get('[data-cy=boot-seeded]').click();
    cy.window().should('have.deep.property', 'intercomSettings', {
      app_id: 'jcabc7e3',
      name: 'Russo',
    });
    cy.get('[data-cy=update-seeded]').click();
    cy.window().should('have.deep.property', 'intercomSettings', {
      app_id: 'jcabc7e3',
      name: 'ponas',
    });
    cy.get('.intercom-lightweight-app-launcher-icon-open').should(
      'not.exist',
    );
  });
});
