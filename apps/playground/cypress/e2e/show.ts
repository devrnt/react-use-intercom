/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('/useIntercom');

  cy.intercept('https://api-iam.intercom.io/messenger/web/ping').as(
    'intercomPing',
  );
  cy.intercept('https://api-iam.intercom.io/messenger/web/open').as(
    'intercomOpen',
  );
  cy.intercept('https://api-iam.intercom.io/messenger/web/metrics').as(
    'intercomMetrics',
  );
});

describe('show', () => {
  it('should show when calling `show`', () => {
    cy.get('[data-cy=boot]').click();
    cy.wait('@intercomPing');

    cy.get('[data-cy=show]').click();
    cy.wait('@intercomOpen');

    cy.get('iframe[name="intercom-messenger-frame"]')
      .should('be.visible')
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');

        cy.wrap($body).contains('Send us a message');
      });
  });
});

describe('showMessages', () => {
  it('should show when calling `showMessages`', () => {
    cy.get('[data-cy=boot]').click();

    cy.get('[data-cy=show-messages]').click();
    cy.get('iframe[name="intercom-messenger-frame"]')
      .should('be.visible')
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');

        cy.wrap($body).contains('Messages from the team will be shown here');
      });
  });
});

describe('showNewMessage', () => {
  it('should show new message `showNewMessage`', () => {
    cy.get('[data-cy=boot]').click();
    cy.wait('@intercomPing');

    cy.get('[data-cy=show-new-messages]').click();
    cy.wait('@intercomOpen');

    cy.get('iframe[name="intercom-messenger-frame"]')
      .should('be.visible')
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');

        cy.wrap($body).contains('Ask us anything, or share your feedback.');
        cy.wrap($body).find('button[data-testid="go-back"]').should('exist');
      });
  });

  it('should show new message with content when calling `showNewMessage`', () => {
    cy.get('[data-cy=boot]').click();
    cy.wait('@intercomPing');

    cy.get('[data-cy=show-messages-content]').click();
    cy.wait('@intercomOpen');

    cy.get('iframe[name="intercom-messenger-frame"]')
      .should('be.visible')
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');

        cy.wrap($body).find('button[data-testid="go-back"]').should('exist');
        cy.wrap($body)
          .find('textarea')
          .should('exist')
          .should('have.value', 'pre-definded-content');
      });
  });
});
