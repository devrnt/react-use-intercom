/// <reference types="cypress" />

describe('getVisitorId', () => {
  it('should get visitor id when calling `getVisitorId`', () => {
    cy.visit('/useIntercom');

    cy.get('[data-cy=boot]').click();

    cy.get('[data-cy="visitorIdValue"]').should('not.be.visible');
    cy.wait(1500);

    cy.get('[data-cy="visitorId"]').click();
    cy.get('[data-cy="visitorIdValue"]').should('be.visible');
  });
});
