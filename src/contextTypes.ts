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
};

export type IntercomProviderProps = {
  appId: string;
  children: React.ReactNode;
};
