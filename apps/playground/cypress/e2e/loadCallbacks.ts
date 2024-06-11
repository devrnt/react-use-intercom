/// <reference types="cypress" />

describe('onLoad/onLoadFailed', () => {
  it('should call onLoad when successful', () => {
    cy.visit('/useIntercomWithLoadCallbacks');

    cy.get('[data-cy=call]').should(($p) =>
      expect($p).to.have.text('onLoad was called!'),
    );
  });

  it('should call onLoadFailed when not successful', () => {
    cy.visit('/useIntercomWithLoadCallbacks');

    cy.intercept('https://widget.intercom.io/widget/jcabc7e3', {
      forceNetworkError: true,
    });

    cy.get('[data-cy=call]').should(($p) =>
      expect($p).to.have.text('onLoadFailed was called!'),
    );
  });
});
