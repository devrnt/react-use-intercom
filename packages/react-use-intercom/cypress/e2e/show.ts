/// <reference types="cypress" />

before(() => {
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
  cy.intercept('https://api-iam.intercom.io/messenger/web/home_cards').as(
    'intercomHomeCards',
  );
});

describe('show', () => {
  it('should show when calling `show`', () => {
    cy.visit('/useIntercom');

    cy.get('[data-cy=boot]').click();
    cy.wait('@intercomPing');

    cy.get('[data-cy=show]').click();
    cy.wait('@intercomOpen');
    cy.wait('@intercomHomeCards');

    cy.get('iframe[name="intercom-messenger-frame"]')
      .should('be.visible')
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');

        cy.wrap($body).contains('Start a conversation');
      });
  });
});

describe('showMessages', () => {
  it('should show when calling `showMessages`', () => {
    cy.visit('/useIntercom');

    cy.get('[data-cy=boot]').click();

    cy.get('[data-cy=show-messages]').click();
    cy.get('.intercom-messenger-frame > iframe').should('be.visible');

    cy.get('[data-cy=hide]').click({ force: true });
    cy.get('.intercom-messenger-frame > iframe').should('not.exist');
  });
});

describe('showNewMessage', () => {
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

    cy.visit('/useIntercom');
  });

  it('should show new message `showNewMessage`', () => {
    cy.get('[data-cy=boot]').click();
    cy.wait('@intercomPing');

    cy.get('[data-cy=show-new-messages]').click();
    cy.wait('@intercomOpen');

    cy.get('iframe[name="intercom-messenger-frame"]')
      .should('be.visible')
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');

        cy.wrap($body).find('[aria-label="Back"]').should('exist');
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

        cy.wrap($body).find('[aria-label="Back"]').should('exist');
        cy.wrap($body)
          .find('textarea[name="message"]')
          .should('exist')
          .should('have.value', 'pre-definded-content');
      });
  });
});
