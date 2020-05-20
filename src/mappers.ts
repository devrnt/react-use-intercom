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

/**
 * Converts all camel cased keys to snake case
 *
 * @param obj
 */
export const camelToSnake = (obj: any, keysToReplace?: Array<string>) => {
  Object.keys(obj).forEach(key => {
    if (keysToReplace && keysToReplace.includes(key)) {
      const newKey = key.replace(
        /(?:^|\.?)([A-Z])/g,
        (_, y) => '_' + y.toLowerCase(),
      );
      obj[newKey] = obj[key];

      delete obj[key];
    }
  });
  return obj;
};

/**
 * Converts all camel cased keys to snake case
 *
 * @param obj
 */
export const snakeToCamel = (obj: any, keysToReplace?: Array<string>) => {
  Object.keys(obj).forEach(key => {
    if (keysToReplace && keysToReplace.includes(key)) {
      const newKey = key.replace(/([_][a-z])/g, x =>
        x.toUpperCase().replace('_', ''),
      );
      obj[newKey] = obj[key];

      delete obj[key];
    }
  });
  return obj;
};

export const mapRawMessengerAttributesToMessengerAttributes = (
  attributes: RawMessengerAttributes,
): MessengerAttributes =>
  snakeToCamel(attributes, [
    'custom_launcher_selector',
    'vertical_padding',
    'horizontal_padding',
    'hide_default_launcher',
    'session_duration',
    'action_color',
    'background_color',
  ]);

export const mapMessengerAttributesToRawMessengerAttributes = (
  attributes: MessengerAttributes,
): RawMessengerAttributes =>
  camelToSnake(attributes, [
    'customLauncherSelector',
    'verticalPadding',
    'horizontalPadding',
    'hideDefaultLauncher',
    'sessionDuration',
    'actionColor',
    'backgroundColor',
  ]);

const mapRawDataAttributesCompanyToDataAttributesCompany = (
  attributes: RawDataAttributesCompany,
): DataAttributesCompany =>
  snakeToCamel(attributes, [
    'company_id',
    'created_at',
    'monthly_spend',
    'user_count',
  ]);

const mapDataAttributesCompanyToRawDataAttributesCompany = (
  attributes: DataAttributesCompany,
): RawDataAttributesCompany =>
  camelToSnake(attributes, [
    'companyId',
    'createdAt',
    'monthlySpend',
    'userCount',
  ]);

const mapRawDataAttributesAvatarToDataAttributesAvatar = (
  attributes: RawDataAttributesAvatar,
): DataAttributesAvatar => snakeToCamel(attributes, ['image_url']);

const mapDataAttributesAvatarToRawDataAttributesAvatar = (
  attributes: DataAttributesAvatar,
): RawDataAttributesAvatar => camelToSnake(attributes, ['imageUrl']);

export const mapRawDataAttributesToDataAttributes = (
  attributes: RawDataAttributes,
): DataAttributes => {
  let newAttributes = snakeToCamel(attributes, [
    'user_id',
    'created_at',
    'last_request_at',
    'unsubscribed_from_emails',
    'language_override',
    'utm_campaign',
    'utm_medium',
    'utm_source',
    'utm_term',
    'user_hash',
  ]);

  if (attributes.avatar) {
    newAttributes.avatar = mapRawDataAttributesAvatarToDataAttributesAvatar(
      attributes.avatar,
    );
  }
  if (attributes.company) {
    newAttributes.company = mapRawDataAttributesCompanyToDataAttributesCompany(
      attributes.company,
    );
  }
  newAttributes.companies?.map(
    mapRawDataAttributesCompanyToDataAttributesCompany,
  );

  return newAttributes;
};

export const mapDataAttributesToRawDataAttributes = (
  attributes: DataAttributes,
): RawDataAttributes => {
  let newAttributes = camelToSnake(attributes, [
    'userId',
    'createdAt',
    'lastRequestAt',
    'unsubscribedFromEmails',
    'languageOverride',
    'utmCampaign',
    'utmMedium',
    'utmSource',
    'utmTerm',
    'userHash',
  ]);

  if (attributes.avatar) {
    newAttributes.avatar = mapDataAttributesAvatarToRawDataAttributesAvatar(
      attributes.avatar,
    );
  }
  if (attributes.company) {
    newAttributes.company = mapDataAttributesCompanyToRawDataAttributesCompany(
      attributes.company,
    );
  }
  newAttributes.companies?.map(
    mapDataAttributesCompanyToRawDataAttributesCompany,
  );

  return newAttributes;
};

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
