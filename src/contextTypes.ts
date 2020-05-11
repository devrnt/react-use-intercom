import { IntercomProps } from './types';

export type IntercomContextValues = {
  /**
   * If you'd like to control when Intercom is loaded, you can use the 'boot' method.
   *
   * @remarks This is useful in situations like a one-page Javascript based application
   * where the user may not be logged in when the page loads.
   * @param props the standard optional intercom props
   * 
   * @see {@link https://developers.intercom.com/installing-intercom/docs/intercom-javascript#section-intercomboot-intercomsettings}

   */
  boot: (props?: IntercomProps) => void;
  /**
   * If you have the Inbox product (combined with another product like Messages)
   * you should call the Intercom shutdown method to clear your users’ conversations
   * anytime they logout of your application.
   *
   * Otherwise, the cookie we use to track who was most recently logged in on a
   * given device or computer  will keep these conversations in the Messenger for one week.
   *
   * @remarks This method will effectively clear out any user data that you have been passing through the JS API.
   
   * @see {@link https://developers.intercom.com/installing-intercom/docs/intercom-javascript#section-intercomshutdown}
   */
  shutdown: () => void;
  /**
   * Same functionality as `shutdown` but makes sure the Intercom cookies,
   * `window.Intercom` and `window.intercomSettings` are removed.
   *
   * @see {@link https://developers.intercom.com/installing-intercom/docs/intercom-javascript#section-intercomupdate}
   */
  hardShutdown: () => void;
  /**
   * Calling the update method with a JSON object of user details will update
   * those fields on the current user in addition to logging an impression at
   * the current URL and looking for new messages for the user.
   *
   */
  update: (props?: Partial<IntercomProps>) => void;
  /**
   * Calls Intercom with a auto generated `last_request_at` property
   *
   * @remarks You will need to call `refresh` in order to initiate a "ping" every time the URL changes.
   */
  refresh: () => void;
  /**
   * Hides the main Messenger panel if it is open. It will not hide the Messenger Launcher.
   *
   * @see {@link https://developers.intercom.com/installing-intercom/docs/intercom-javascript#section-intercomhide}
   */
  hide: () => void;
  /**
   * Shows the Messenger.
   *
   * @remarks If there are no new conversations, it will open to the Messenger Home.
   * If there are, it will open with the message list.
   *
   * @see {@link https://developers.intercom.com/installing-intercom/docs/intercom-javascript#section-intercomshow}
   */
  show: () => void;
  /**
   * Opens the Messenger with the message list.
   */
  showMessages: () => void;
  /**
   * Opens the Messenger as if a new conversation was just created.
   *
   * @remarks This function can also take an optional second parameter, used to pre-populate the message composer as shown in the code example below..
   *
   * @see {@link https://developers.intercom.com/installing-intercom/docs/intercom-javascript#section-intercomshownewmessage}
   *
   * @example
   * ```
   * showMessages();
   * ```
   * @example
   * ```
   * showMessages('pre-populated-content');
   * ```
   */
  showNewMessages: (prePopulatedContent?: string) => void;
  /**
   * A visitor is someone who goes to your site but does not use the messenger.
   * You can track these visitors via the visitor `user_id`.
   *
   * @remarks This `user_id` can be used to retrieve the visitor or lead through the REST API.
   *
   * @see {@link https://developers.intercom.com/installing-intercom/docs/intercom-javascript#section-intercomgetvisitorid}
   */
  getVisitorId: () => string;
  /**
   * Triggers a tour based on an action a user or visitor takes in your site or application,
   * You need to call this method with the id of the tour you wish to show.
   *
   * The id of the tour can be found in the “Use tour everywhere” section of the tour editor.
   *
   * @remarks Please note that tours shown via this API must be published and
   * the “Use tour everywhere” section must be turned on.
   * If you're calling this API using an invalid tour id, nothing will happen.
   *
   * @see {@link https://developers.intercom.com/installing-intercom/docs/intercom-javascript#section-intercomstarttour-tourid}
   */
  startTour: (tourId: number) => void;
  /**
   * Submits an event, this will associate the event with the currently
   * tracked visitor, lead or user and send it to Intercom
   *
   * The final parameter is an optional metadata object that can be used to send additional details about the event.
   *
   * @see {@link https://developers.intercom.com/installing-intercom/docs/intercom-javascript#section-intercomtrackevent}
   *
   * @example
   * ```
   * const metadata = {
   *   item: 'NES',
   *   price: {"amount": 2900, "currency": "usd"},
   *   catalog_img: "https://downloads.intercomcdn.com/128113c39a6a.jpg",
   * };
   *
   * trackEvent('purchased-item', metadata);
   * ```
   */
  trackEvent: (event: string, metaData?: object) => void;
};

export type IntercomProviderProps = {
  /** The app ID of your Intercom app which will indicate where to store any data  */
  appId: string;
  /**
   * Indicates if Intercom should be automatically booted
   *
   * @remarks if `true`, 'boot' does not need to be called manually
   * */
  autoBoot?: boolean;
  /**
   * React children
   */
  children: React.ReactNode;
  /**
   * When we hide the messenger, you can hook into the event. This requires a function argument.
   */
  onHide?: Function;
  /**
   * When we show the messenger, you can hook into the event. This requires a function argument.
   */
  onShow?: Function;
  /**
   * This method allows you to register a function that will be called immediately
   * when invoked, and again whenever the current number of unread messages changes.
   */
  onUnreadCountChange?: Function;
  // TODO: logging prop
};
