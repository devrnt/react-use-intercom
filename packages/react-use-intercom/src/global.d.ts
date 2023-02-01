export {};
declare global {
  var __DEV__: boolean;

  interface Window {
    Intercom: any;
    intercomSettings: any;
    attachEvent: any;
  }
  interface HTMLScriptElement {
    parentNode: any;
  }
}
