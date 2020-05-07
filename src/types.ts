export type RawMessengerAttributes = {
  app_id: string;
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
  /** The app ID of your Intercom app which will indicate where to store any data  */
  appId: string;
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
