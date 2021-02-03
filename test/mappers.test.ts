import { IntercomBootProps, RawIntercomBootProps } from '../src/types';
import { transformSnakeObjectToCamelCase } from '../src/utils';

const createRawIntercomProps = (): RawIntercomBootProps => {
  return {
    app_id: 'test',
    action_color: 'red',
    alignment: 'center',
    customAttributes: {
      name: 'John',
      created_at: '01-01-2000',
    },
    avatar: {
      type: 'John',
      image_url: 'https://devrnt.github.io/react-use-intercom/#/useIntercom',
    },
    background_color: 'red',
    companies: [
      {
        company_id: '1',
        created_at: '01-01-2000',
        industry: 'pharmacy',
        monthly_spend: 1,
        name: 'John',
        plan: 'plan',
        size: 1,
        user_count: 1,
        website: 'https://devrnt.github.io/react-use-intercom/#/useIntercom',
      },
    ],
    company: {
      company_id: '1',
      created_at: '01-01-2000',
      industry: 'pharamacy',
      monthly_spend: 1,
      name: 'John',
      plan: 'plan',
      size: 1,
      user_count: 1,
      website: 'https://devrnt.github.io/react-use-intercom/#/useIntercom',
    },
    created_at: '01-01-2000',
    custom_launcher_selector: 'yes',
    email: 'john@doe.com',
    hide_default_launcher: false,
    horizontal_padding: 1,
    language_override: 'nl',
    last_request_at: '01-01-2000',
    name: 'John',
    phone: '01',
    session_duration: 1,
    unsubscribed_from_emails: true,
    user_hash: '1',
    user_id: '1',
    utm_campaign: 'campaign',
    utm_content: 'content',
    utm_medium: 'medium',
    utm_source: 'souce',
    utm_term: 'term',
    vertical_padding: 1,
  };
};

const createTransformedProps = (): IntercomBootProps => {
  return {
    appId: 'test',
    actionColor: 'red',
    alignment: 'center',
    customAttributes: {
      name: 'John',
      createdAt: '01-01-2000',
    },
    avatar: {
      type: 'John',
      imageUrl: 'https://devrnt.github.io/react-use-intercom/#/useIntercom',
    },
    backgroundColor: 'red',
    companies: [
      {
        companyId: '1',
        createdAt: '01-01-2000',
        industry: 'pharmacy',
        monthlySpend: 1,
        name: 'John',
        plan: 'plan',
        size: 1,
        userCount: 1,
        website: 'https://devrnt.github.io/react-use-intercom/#/useIntercom',
      },
    ],
    company: {
      companyId: '1',
      createdAt: '01-01-2000',
      industry: 'pharamacy',
      monthlySpend: 1,
      name: 'John',
      plan: 'plan',
      size: 1,
      userCount: 1,
      website: 'https://devrnt.github.io/react-use-intercom/#/useIntercom',
    },
    createdAt: '01-01-2000',
    customLauncherSelector: 'yes',
    email: 'john@doe.com',
    hideDefaultLauncher: false,
    horizontalPadding: 1,
    languageOverride: 'nl',
    lastRequestAt: '01-01-2000',
    name: 'John',
    phone: '01',
    sessionDuration: 1,
    unsubscribedFromEmails: true,
    userHash: '1',
    userId: '1',
    utmCampaign: 'campaign',
    utmContent: 'content',
    utmMedium: 'medium',
    utmSource: 'souce',
    utmTerm: 'term',
    verticalPadding: 1,
  };
};

describe('mappers', () => {
  test('should transform raw intercom props to camel case props', () => {
    const raw = createRawIntercomProps();
    const expected = createTransformedProps();

    const transformed = transformSnakeObjectToCamelCase(raw);

    expect(transformed).toEqual(expected);
  });
});
