import {
  RawMessengerAttributes,
  MessengerAttributes,
  RawDataAttributesCompany,
  DataAttributesCompany,
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

export {
  mapRawMessengerAttributesToMessengerAttributes,
  mapRawDataAttributesCompanyToDataAttributesCompany,
};
