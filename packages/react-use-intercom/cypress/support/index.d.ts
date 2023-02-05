/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Retrieve iframe's body content after it has loaded for us to chain like .find() or .within() after it
     *
     * @example
     * cy.iframe(iframeSelector).within(() => { ... })
     */
    iframe(iframeSelector: string): Chainable<Subject>;

    // Typing out all of our custom plugins i.e. cy.task(...)
  }
}
