/// <reference types="cypress" />

describe('onLoad / onLoadFailed', () => {
  it('should call onLoad when the Messenger script loads successfully', () => {
    // Bypass the cache so the script is actually (re)requested on each run
    cy.intercept('https://widget.intercom.io/widget/jcabc7e3', (req) => {
      req.continue((res) => {
        res.headers['cache-control'] = 'no-cache';
      });
    });

    cy.visit('/useIntercomWithLoadCallbacks');

    cy.get('[data-cy=call]').should('have.text', 'onLoad was called!');
  });

  it('should call onLoadFailed when the Messenger script fails to load', () => {
    cy.intercept('https://widget.intercom.io/widget/jcabc7e3', {
      forceNetworkError: true,
    });

    cy.visit('/useIntercomWithLoadCallbacks');

    cy.get('[data-cy=call]').should('have.text', 'onLoadFailed was called!');
  });
});
