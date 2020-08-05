import {
  RawMessengerAttributes,
  MessengerAttributes,
  RawDataAttributesCompany,
  DataAttributesCompany,
  RawDataAttributesAvatar,
  DataAttributesAvatar,
  RawDataAttributes,
  DataAttributes,
  RawIntercomProps,
  IntercomProps,
  RawIntercomBootProps,
  IntercomBootProps,
} from './types';

/**
 * Removes object entries where the value equals to `undefined`
 *
 * @param obj
 * @private
 */
const removeUndefined = (obj: any) => {
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'object') removeUndefined(obj[key]);
    else if (obj[key] === undefined) delete obj[key];
  });
  return obj;
};

export const mapRawMessengerAttributesToMessengerAttributes = (
  attributes: RawMessengerAttributes,
): MessengerAttributes => ({
  customLauncherSelector: attributes.custom_launcher_selector,
  alignment: attributes.alignment,
  verticalPadding: attributes.vertical_padding,
  horizontalPadding: attributes.horizontal_padding,
  hideDefaultLauncher: attributes.hide_default_launcher,
  sessionDuration: attributes.session_duration,
  actionColor: attributes.action_color,
  backgroundColor: attributes.background_color,
});

export const mapMessengerAttributesToRawMessengerAttributes = (
  attributes: MessengerAttributes,
): RawMessengerAttributes => ({
  custom_launcher_selector: attributes.customLauncherSelector,
  alignment: attributes.alignment,
  vertical_padding: attributes.verticalPadding,
  horizontal_padding: attributes.horizontalPadding,
  hide_default_launcher: attributes.hideDefaultLauncher,
  session_duration: attributes.sessionDuration,
  action_color: attributes.actionColor,
  background_color: attributes.backgroundColor,
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

const mapDataAttributesCompanyToRawDataAttributesCompany = (
  attributes: DataAttributesCompany,
): RawDataAttributesCompany => ({
  company_id: attributes.companyId,
  name: attributes.name,
  created_at: attributes.createdAt,
  plan: attributes.plan,
  monthly_spend: attributes.monthlySpend,
  user_count: attributes.userCount,
  size: attributes.size,
  website: attributes.website,
  industry: attributes.industry,
  ...attributes.customAttributes,
});

const mapRawDataAttributesAvatarToDataAttributesAvatar = (
  attributes: RawDataAttributesAvatar,
): DataAttributesAvatar => ({
  type: attributes.type,
  imageUrl: attributes.image_url,
});

const mapDataAttributesAvatarToRawDataAttributesAvatar = (
  attributes: DataAttributesAvatar,
): RawDataAttributesAvatar => ({
  type: attributes.type,
  image_url: attributes.imageUrl,
});

export const mapRawDataAttributesToDataAttributes = (
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
  avatar:
    attributes.avatar &&
    mapRawDataAttributesAvatarToDataAttributesAvatar(attributes.avatar),
  userHash: attributes.user_hash,
  company:
    attributes.company &&
    mapRawDataAttributesCompanyToDataAttributesCompany(attributes.company),
  companies: attributes.companies?.map(
    mapRawDataAttributesCompanyToDataAttributesCompany,
  ),
});

export const mapDataAttributesToRawDataAttributes = (
  attributes: DataAttributes,
): RawDataAttributes => ({
  email: attributes.email,
  user_id: attributes.userId,
  created_at: attributes.createdAt,
  name: attributes.name,
  phone: attributes.phone,
  last_request_at: attributes.lastRequestAt,
  unsubscribed_from_emails: attributes.unsubscribedFromEmails,
  language_override: attributes.languageOverride,
  utm_campaign: attributes.utmCampaign,
  utm_content: attributes.utmContent,
  utm_medium: attributes.utmMedium,
  utm_source: attributes.utmSource,
  utm_term: attributes.utmTerm,
  avatar:
    attributes.avatar &&
    mapDataAttributesAvatarToRawDataAttributesAvatar(attributes.avatar),
  user_hash: attributes.userHash,
  company:
    attributes.company &&
    mapDataAttributesCompanyToRawDataAttributesCompany(attributes.company),
  companies: attributes.companies?.map(
    mapDataAttributesCompanyToRawDataAttributesCompany,
  ),
  ...attributes.customAttributes,
});

export const mapRawIntercomPropsToIntercomProps = (
  props: RawIntercomProps,
): IntercomProps => ({
  ...mapRawMessengerAttributesToMessengerAttributes(props),
  ...mapRawDataAttributesToDataAttributes(props),
});

export const mapRawIntercomBootPropsToIntercomBootProps = (
  props: RawIntercomBootProps,
): IntercomBootProps => ({
  appId: props.app_id,
  ...mapRawMessengerAttributesToMessengerAttributes(props),
  ...mapRawDataAttributesToDataAttributes(props),
});

// TODO: Consider if we should auto convert the keys
// of the 'custom_attributes' from underscore to camel case
export const mapIntercomBootPropsToRawIntercomBootProps = (
  props: IntercomBootProps,
): RawIntercomBootProps => {
  return removeUndefined({
    app_id: props.appId,
    ...mapMessengerAttributesToRawMessengerAttributes(props),
    ...mapDataAttributesToRawDataAttributes(props),
  });
};

export const mapIntercomPropsToRawIntercomProps = (
  props: IntercomProps,
): RawIntercomProps => {
  return removeUndefined({
    ...mapMessengerAttributesToRawMessengerAttributes(props),
    ...mapDataAttributesToRawDataAttributes(props),
  });
};
