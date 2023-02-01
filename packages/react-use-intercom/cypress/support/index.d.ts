declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select an element in the iframe element
     * @example cy.iframe('elementInIframe')
     */
    iframe(value: string): Chainable<Element>;
  }
}
