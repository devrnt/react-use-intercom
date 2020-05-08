import {
  RawMessengerAttributes,
  MessengerAttributes,
  RawDataAttributesCompany,
  DataAttributesCompany,
  RawDataAttributesAvatar,
  DataAttributesAvatar,
  RawDataAttributes,
  DataAttributes,
} from 'types';

const mapRawMessengerAttributesToMessengerAttributes = (
  attributes: RawMessengerAttributes,
): MessengerAttributes => ({
  appId: attributes.app_id,
  customLauncherSelector: attributes.custom_launcher_selector,
  alignment: attributes.alignment,
  verticalPadding: attributes.vertical_padding,
  horizontalPadding: attributes.horizontal_padding,
  hideDefaultLauncher: attributes.hide_default_launcher,
  sessionDuration: attributes.session_duration,
  actionColor: attributes.action_color,
  backgroundColor: attributes.background_color,
});

const mapRawDataAttributesCompanyToDataAttributesCompany = (
  attributes: RawDataAttributesCompany,
): DataAttributesCompany => ({
  companyId: attributes.company_id,
  name: attributes.name,
  createdAt: attributes.created_at,
  plan: attributes.plan,
  monthlySpend: attributes.monthly_spend,
  userCount: attributes.user_count,
  size: attributes.size,
  website: attributes.website,
  industry: attributes.industry,
});

const mapRawDataAttributesAvatarToDataAttributesAvatar = (
  attributes: RawDataAttributesAvatar,
): DataAttributesAvatar => ({
  type: attributes.type,
  imageUrl: attributes.image_url,
});

const mapRawDataAttributesToDataAttributes = (
  attributes: RawDataAttributes,
): DataAttributes => ({
  email: attributes.email,
  userId: attributes.user_id,
  createdAt: attributes.created_at,
  name: attributes.name,
  phone: attributes.phone,
  lastRequestAt: attributes.last_request_at,
  unsubscribedFromEmails: attributes.unsubscribed_from_emails,
  languageOverride: attributes.language_override,
  utmCampaign: attributes.utm_campaign,
  utmMedium: attributes.utm_medium,
  utmSource: attributes.utm_source,
  utmTerm: attributes.utm_term,
  avatar: attributes.avatar,
  userHash: attributes.user_hash,
  company:
    attributes.company &&
    mapRawDataAttributesCompanyToDataAttributesCompany(attributes.company),
  companies: attributes.companies?.map(
    mapRawDataAttributesCompanyToDataAttributesCompany,
  ),
});

export {
  mapRawMessengerAttributesToMessengerAttributes,
  mapRawDataAttributesCompanyToDataAttributesCompany,
  mapRawDataAttributesAvatarToDataAttributesAvatar,
  mapRawDataAttributesToDataAttributes,
};
