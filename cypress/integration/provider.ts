/// <reference types="cypress" />

describe('provider', () => {
  it('should render children', () => {
    cy.visit('/provider');

    cy.get('p').should('be.visible');
  });
});

describe('provider with events', () => {
  it('should render children', () => {
    cy.visit('/providerEvents');

    cy.get('p').should('be.visible');
  });

  it('should render default text', () => {
    cy.visit('/providerEvents');

    cy.contains('default');
  });

  it('should not execute `onShow` when not booted', () => {
    cy.visit('/providerEvents');

    cy.get('[data-cy=onShowText]').should('have.text', 'default');
    cy.get('[data-cy=show]').click();

    cy.get('[data-cy=onShowText]').should('have.text', 'default');
  });

  it('should execute `onShow` event when clicking `show`', () => {
    cy.visit('/providerEvents');

    cy.get('[data-cy=onShowText]').should('have.text', 'default');
    cy.get('[data-cy=boot]').click();
    cy.get('[data-cy=show]').click();

    cy.get('[data-cy=onShowText]').should('have.text', 'show was called');
  });

  it('should not execute `onHide` event when clicking `hide`', () => {
    cy.visit('/providerEvents');

    cy.get('[data-cy=onHideText]').should('have.text', 'default');
    cy.get('[data-cy=boot]').click();

    cy.get('[data-cy=onHideText]').should('have.text', 'default');
  });

  it('should execute `onHide` event when clicking `hide`', () => {
    cy.visit('/providerEvents');

    cy.get('[data-cy=onHideText]').should('have.text', 'default');
    cy.get('[data-cy=boot]').click();
    cy.get('[data-cy=show]').click();
    cy.get('[data-cy=hide]').click();

    cy.get('[data-cy=onHideText]').should('have.text', 'hide was called');
  });
});
