/// <reference types="cypress" />

describe('mappers', () => {
  // TODO: 'contain' does not work for objects (like avatar...)
  it('should map passed props to raw propped on `boot`', () => {
    cy.visit('/useIntercom');

    cy.window().should('not.have.property', 'intercomSettings');

    cy.get('[data-cy=boot-extended-seeded]').click();

    cy.window().should('have.property', 'Intercom');

    cy.window()
      .its('intercomSettings')
      .should('be.an', 'object')
      .and('contain', {
        app_id: 'jcabc7e3',
        name: 'Russo',
        action_color: 'red',
        utm_content: 'content',
        vertical_padding: 10,
        alignment: 'left',
        background_color: 'green',
        created_at: 'now',
        custom_launcher_selector: '.id',
        hide_default_launcher: false,
        horizontal_padding: 10,
        language_override: 'en',
        phone: '0470',
        session_duration: 1000,
        unsubscribed_from_emails: false,
        last_request_at: 'now',
        utm_campaign: 'campaign',
        utm_source: 'source',
        utm_medium: 'medium',
        utm_term: 'term',
        user_id: '12345',
        my_custom_attribute: 'custom_attribute_value',
        my_second_custom_attribute: 'second_custom_attribute_value',
      })
      .and('not.contain', {
        my_fifth_custom_attribute: 'custom_attribute_value',
      });

    cy.window()
      .its('intercomSettings')
      .its('avatar')
      .should('be.an', 'object')
      .and('deep.equal', {
        type: 'image',
        image_url: 'https://github.com/devrnt/react-use-intercom',
      });

    cy.window()
      .its('intercomSettings')
      .its('company')
      .should('be.an', 'object')
      .and('deep.equal', {
        company_id: 'company',
        created_at: 'now',
        industry: 'industry',
        monthly_spend: 10,
        name: 'name',
        plan: 'plan',
        size: 12,
        user_count: 100,
        website: 'https://github.com/devrnt/react-use-intercom',
      });

    cy.window()
      .its('intercomSettings')
      .its('companies')
      .should('be.an', 'array')
      .and('deep.equal', [
        {
          company_id: 'company',
          created_at: 'now',
          industry: 'industry',
          monthly_spend: 10,
          name: 'name',
          plan: 'plan',
          size: 12,
          user_count: 100,
          website: 'https://github.com/devrnt/react-use-intercom',
        },
      ]);
  });
});
