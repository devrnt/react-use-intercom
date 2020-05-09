import { IntercomMethod } from './types';
/**
 * Safely exposes `window.Intercom` and passes the arguments to the instance
 *
 * @param method method passed to the `window.Intercom` instance
 * @param args arguments passed to the `window.Intercom` instance
 * @see {@link https://developers.intercom.com/installing-intercom/docs/intercom-javascript}
 */
export const IntercomAPI = (method: IntercomMethod, ...args: Array<any>) => {
  if (window.Intercom) {
    window.Intercom.apply(null, [method, args]);
  } else {
    console.warn('[intercom] Intercom instance is not initialized yet');
  }
};
