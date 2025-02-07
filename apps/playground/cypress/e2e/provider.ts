/// <reference types="cypress" />

beforeEach(() => {
  cy.intercept('https://api-iam.intercom.io/messenger/web/ping').as(
    'intercomPing',
  );
  cy.intercept('https://api-iam.intercom.io/messenger/web/open').as(
    'intercomOpen',
  );
  cy.intercept('https://api-iam.intercom.io/messenger/web/metrics').as(
    'intercomMetrics',
  );
  cy.intercept('https://api-iam.intercom.io/messenger/web/messages').as(
    'intercomMessages',
  );
  cy.intercept('https://api-iam.intercom.io/messenger/web/home').as(
    'intercomHome',
  );
  cy.intercept('https://api-iam.intercom.io/messenger/web/conversations').as(
    'intercomConversations',
  );
});

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

  it('should execute `onUserEmailSupplied` event on `onUserEmailSupplied`', () => {
    cy.get('[data-cy=onUserEmailSuppliedText]').should('have.text', 'default');

    cy.get('[data-cy=boot]').click();

    cy.get('[data-cy=show]').click();

    cy.get('iframe[name="intercom-messenger-frame"]').then(($iframe) => {
      const $body = $iframe.contents().find('body');

      cy.wrap($body).contains('Send us a message').click();

      cy.wait('@intercomHome');
      cy.wait('@intercomConversations');

      cy.wrap($body)
        .find('textarea')
        .should('exist')
        .type('hello')
        .type('{enter}');

      cy.wait('@intercomMessages');

      cy.wrap($body).contains('Get notified by email', { timeout: 10000 });

      cy.wrap($body)
        .find('input[type="email"]')
        .type('hello@email.com')
        .type('{enter}');

      cy.get('[data-cy=onUserEmailSuppliedText]').should(
        'have.text',
        'on user email supplied was called',
      );
    });
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
  beforeEach(() => {
    cy.visit('/providerAutoBootProps');
  });

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
