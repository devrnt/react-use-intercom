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

  cy.intercept('https://api-iam.intercom.io/messenger/web/surveys/*/fetch').as(
    'intercomStartSurvey',
  );
});

describe('startSurvey', () => {
  it('start start the survey', () => {
    cy.get('[data-cy=boot]').click();
    cy.wait('@intercomPing');

    cy.get('[data-cy="start-survey"]').click();

    cy.wait(2000);

    cy.wait('@intercomStartSurvey');

    cy.get('iframe[name="intercom-banner-survey-frame"]').then(($iframe) => {
      const $body = $iframe.contents().find('body');

      cy.wrap($body).contains('What is the highest mountain in the world');
    });
  });
});
