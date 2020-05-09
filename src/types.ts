export type RawMessengerAttributes = {
  custom_launcher_selector?: string;
  alignment?: string;
  vertical_padding?: number;
  horizontal_padding?: number;
  hide_default_launcher?: boolean;
  session_duration?: number;
  action_color?: string;
  background_color?: string;
};

export type MessengerAttributes = {
  /** The CSS selector of an element to trigger Intercom("show") in order to activate the messenger
   *
   * @remarks To target an element by ID: "#id_of_element". To target elements by class ".classname_of_elements"
   * @see {@link https://docs.intercom.com/configure-intercom-for-your-product-or-site/customize-the-intercom-messenger/customize-the-intercom-messenger-technical}
   */
  customLauncherSelector?: string;
  /** Dictate the alignment of the default launcher icon to be on the left/right
   *
   * @remarks Possible values: "left" or "right" (any other value is treated as right)
   * @see {@link https://docs.intercom.com/configure-intercom-for-your-product-or-site/customize-the-intercom-messenger/customize-the-intercom-messenger-technical}
   */
  alignment?: string;
  /** Move the default launcher icon vertically
   *
   * @remarks Padding from bottom of screen. Minimum value: 20. Does not work on mobile
   * @see {@link https://docs.intercom.com/configure-intercom-for-your-product-or-site/customize-the-intercom-messenger/customize-the-intercom-messenger-technical}
   */
  verticalPadding?: number;
  /** Move the default launcher icon horizontally
   *
   * @remarks Padding from right side of screen. Minimum value: 20. Does not work on mobile
   * @see {@link https://docs.intercom.com/configure-intercom-for-your-product-or-site/customize-the-intercom-messenger/customize-the-intercom-messenger-technical}
   */
  horizontalPadding?: number;
  /** Hide the default launcher icon
   *
   * @remarks Setting to false will forcefully show the launcher icon
   * @see {@link https://docs.intercom.com/configure-intercom-for-your-product-or-site/customize-the-intercom-messenger/turn-off-show-or-hide-the-intercom-messenger}
   */
  hideDefaultLauncher?: boolean;
  /** Time in milliseconds for the Intercom session to be considered active
   *
   * @remarks A value of `5 * 60 * 1000` would set the expiry time to be 5 minutes
   */
  sessionDuration?: number;
  /** Used in button links and more to highlight and emphasise
   *
   * @remarks The color string can be any valid CSS: "color name", "hex" or "rgb"
   * @see {@link https://www.w3schools.com/cssref/css_colors.asp}
   */
  actionColor?: string;
  /** Used behind your team profile and other attributes
   *
   * @remarks The color string can be any valid CSS: "color name", "hex" or "rgb"
   * @see {@link https://www.w3schools.com/cssref/css_colors.asp}
   */
  backgroundColor?: string;
};

export type RawDataAttributesCompany = {
  company_id: string;
  name?: string;
  created_at?: string;
  plan?: string;
  monthly_spend?: number;
  user_count?: number;
  size?: number;
  website?: string;
  industry?: string;
};

export type DataAttributesCompany = {
  /** The company ID of the company */
  companyId: string;
  /** The name of the company */
  name?: string;
  /** The time the company was created in your system */
  createdAt?: string;
  /** The name of the plan the company is on */
  plan?: string;
  /** How much revenue the company generates for your business */
  monthlySpend?: number;
  /** Indicates the number of users in Intercom associated to the company
   *
   * @remarks Does not actually update the value but is a reserved keyword
   */
  userCount?: number;
  /** The number of employees in the company */
  size?: number;
  /** The URL for the company website */
  website?: string;
  /** The industry of the company */
  industry?: string;
};

export type RawDataAttributesAvatar = {
  type: string;
  image_url?: string;
};

export type DataAttributesAvatar = {
  /** The value is "avatar" */
  type: string;
  /** An avatar image URL
   *
   * @remarks Needs to be https */
  imageUrl?: string;
};

export type RawDataAttributes = {
  email?: string;
  user_id?: string;
  created_at?: string;
  name?: string;
  phone?: string;
  last_request_at?: string;
  unsubscribed_from_emails?: boolean;
  language_override?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_medium?: string;
  utm_source?: string;
  utm_term?: string;
  avatar?: RawDataAttributesAvatar;
  user_hash?: string;
  company?: RawDataAttributesCompany;
  companies?: RawDataAttributesCompany[];
  [custom_property: string]: any;
};

export type DataAttributes = {
  /** The email address of the currently logged in user
   * 
  @remarks Only applicable to users
  */
  email?: string;
  /** The user ID of the currently logged in user
   * 
  @remarks Only applicable to users
  */
  userId?: string;
  /** The Unix timestamp (in seconds) when the user signed up to your app
   *
   * @remarks Only applicable to users
   * @see {@link https://www.w3schools.com/cssref/css_colors.asp}
   */
  createdAt?: string;
  /** Name of the current user/lead */
  name?: string;
  /** Name of the current user/lead */
  phone?: string;
  /** This value can't actually be set by the Javascript API
   *
   * @remarks It automatically uses the time of the last request but is a this is a reserved attribute
   */
  lastRequestAt?: string;
  /** Sets the unsubscribe status of the record
   *
   * @see {@link https://www.intercom.com/help/en/articles/270-how-do-i-unsubscribe-users-from-receiving-emails}
   */
  unsubscribedFromEmails?: boolean;
  /** Set the messenger language programmatically (instead of relying on browser language settings)
   *
   * @see {@link https://www.intercom.com/help/en/articles/180-localize-intercom-to-work-with-multiple-languages}
   */
  languageOverride?: string;
  /** @see {@link https://www.intercom.com/help/en/articles/908965-track-conversions-and-clicks-with-utm-parameters}
   *
   * @remarks All UTM parameters are updated automatically and can not be manually overidden
   */
  utmCampaign?: string;
  /** @see {@link https://www.intercom.com/help/en/articles/908965-track-conversions-and-clicks-with-utm-parameters}
   */
  utmContent?: string;
  /** @see {@link https://www.intercom.com/help/en/articles/908965-track-conversions-and-clicks-with-utm-parameters}
   */
  utmMedium?: string;
  /** @see {@link https://www.intercom.com/help/en/articles/908965-track-conversions-and-clicks-with-utm-parameters}
   */
  utmSource?: string;
  /** @see {@link https://www.intercom.com/help/en/articles/908965-track-conversions-and-clicks-with-utm-parameters}
   */
  utmTerm?: string;
  /** Set the avatar/profile image associated to the current record
   *
   * @remarks Typically gathered via social profiles via email address
   * @see {@link https://www.intercom.com/help/en/articles/277-where-do-the-social-profiles-come-from}
   */
  avatar?: DataAttributesAvatar;
  /** Used for identity verification
   *
   * @see {@link https://www.intercom.com/help/en/articles/183-enable-identity-verification-for-web-and-mobile}
   * @remarks Only applicable to users
   */
  userHash?: string;
  /** Current user's company
   *
   * @remarks Only applicable to users
   * @remarks Company ID and company name are the minimum requirements to pass a company into Intercom
   * @see {@link https://developers.intercom.com/installing-intercom/docs/javascript-api-attributes-objects#section-company-object}
   */
  company?: DataAttributesCompany;
  /** An array of companies the user is associated to
   *
   * @remarks Only applicable to users
   * @see {@link https://www.intercom.com/help/en/articles/186-group-your-users-by-company}
   */
  companies?: DataAttributesCompany[];
  /**
   * You can do this anytime by adding additional key/value pairs to your intercomSettings code snippet
   *
   * @see {@link https://www.intercom.com/help/en/articles/179-send-custom-user-attributes-to-intercom}
   * @remarks The key is the attribute name. The value is a placeholder for the data you’ll track
   */
  [customProperty: string]: any;
};

export type IntercomMethod =
  | 'boot'
  | 'shutdown'
  | 'update'
  | 'hide'
  | 'show'
  | 'showMessages'
  | 'showNewMessage'
  | 'onHide'
  | 'onShow'
  | 'onUnreadCountChange'
  | 'trackEvent'
  | 'getVisitorId'
  | 'startTour';

export type RawIntercomProps = { app_id: string } & RawMessengerAttributes &
  RawDataAttributes;

export type IntercomProps = {
  /** The app ID of your Intercom app which will indicate where to store any data  */
  appId: string;
} & MessengerAttributes &
  DataAttributes;
