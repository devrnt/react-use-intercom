/// <reference types="cypress" />

describe('initialize delay', () => {
  it('should not load script on initial load with initialize delay', () => {
    cy.visit('/useIntercomWithTimeout');

    cy.document() //Important, because Cypress has its own Head
      .get('head script')
      .contains('[src=https://widget.intercom.io/widget/jcabc7e3]')
      .should('not.exist');

    cy.wait(5000);

    cy.document() //Important, because Cypress has its own Head
      .get('head script')
      .should('have.attr', 'src')
      .should('include', 'https://widget.intercom.io/widget/jcabc7e3');
  });
});
