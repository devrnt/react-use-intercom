import { RawIntercomProps } from './types';

declare global {
  var __DEV__: boolean;

  interface Window {
    Intercom: any;
    intercomSettings: RawIntercomProps;
    attachEvent: any;
  }
  interface HTMLScriptElement {
    parentNode: any;
  }
}
