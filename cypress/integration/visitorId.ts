/// <reference types="cypress" />

describe('getVisitorId', () => {
  it('should get visitor id when calling `getVisitorId`', () => {
    cy.visit('/useIntercom');

    cy.get('[data-cy=boot]').click();

    cy.get('[data-cy="visitorIdValue"]').should('not.exist');
    cy.wait(2000);

    cy.get('[data-cy="visitorId"]').click();
    cy.get('[data-cy="visitorIdValue"]').should('be.visible');
  });
});
