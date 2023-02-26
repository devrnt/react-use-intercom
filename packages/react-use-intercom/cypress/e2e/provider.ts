/// <reference types="cypress" />

describe('provider', () => {
  it('should render children', () => {
    cy.visit('/provider');

    cy.get('p').should('be.visible');
  });
});

describe('provider with events', () => {
  beforeEach(() => {
    cy.visit('/providerEvents');
  });

  it('should render children', () => {
    cy.get('p').should('be.visible');
  });

  it('should render default text', () => {
    cy.contains('default');
  });

  it('should not execute `onShow` when not booted', () => {
    cy.get('[data-cy=onShowText]').should('have.text', 'default');
    cy.get('[data-cy=show]').click();

    cy.get('[data-cy=onShowText]').should('have.text', 'default');
  });

  it('should execute `onShow` event when clicking `show`', () => {
    cy.get('[data-cy=onShowText]').should('have.text', 'default');
    cy.get('[data-cy=boot]').click();
    cy.get('[data-cy=show]').click();

    cy.get('[data-cy=onShowText]').should('have.text', 'show was called');
  });

  it('should not execute `onHide` event when clicking `hide`', () => {
    cy.get('[data-cy=onHideText]').should('have.text', 'default');
    cy.get('[data-cy=boot]').click();

    cy.get('[data-cy=onHideText]').should('have.text', 'default');
  });

  it('should execute `onHide` event when clicking `hide`', () => {
    cy.get('[data-cy=onHideText]').should('have.text', 'default');
    cy.get('[data-cy=boot]').click();
    cy.get('[data-cy=show]').click();
    cy.get('[data-cy=hide]').click();

    cy.get('[data-cy=onHideText]').should('have.text', 'hide was called');
  });
});

describe('provider with `apiBase`', () => {
  beforeEach(() => {
    cy.visit('/providerApi');
  });

  it('should set `api_base` if provided', () => {
    cy.get('p').should('be.visible');

    cy.window().should('have.deep.property', 'intercomSettings', {
      app_id: 'jcabc7e3',
      api_base: 'https://jcabc7e3.intercom-messenger.com',
    });
  });
});

describe('provider with `autoBootProps`', () => {
  it('should set properties if passed to `autoBootProps` when `autoBoot` is `true`', () => {
    cy.get('p').should('be.visible');

    cy.get('span')
      .invoke('text')
      .then((phone) => {
        cy.window().should('have.deep.property', 'intercomSettings', {
          app_id: 'jcabc7e3',
          phone,
        });
      });
  });
});
