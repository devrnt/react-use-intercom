/// <reference types="cypress" />

describe('onLoad/onLoadFailed', () => {
  it('should call onLoad when successful', () => {
    cy.intercept('https://widget.intercom.io/widget/jcabc7e3', (request) => {
      request.continue((response) => {
        response.headers['cache-control'] = 'no-cache';
      });
    });

    cy.visit('/useIntercomWithLoadCallbacks');

    cy.get('[data-cy=call]').should(($p) =>
      expect($p).to.have.text('onLoad was called!'),
    );
  });

  it('should call onLoadFailed when not successful', () => {
    cy.intercept('https://widget.intercom.io/widget/jcabc7e3', {
      forceNetworkError: true,
    });

    cy.visit('/useIntercomWithLoadCallbacks');

    cy.get('[data-cy=call]').should(($p) =>
      expect($p).to.have.text('onLoadFailed was called!'),
    );
  });
});
