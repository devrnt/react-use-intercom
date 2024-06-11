// @ts-nocheck
/**
 * Snippet to initialize the Intercom instance
 *
 * @param appId - Intercom app id
 * @param [timeout=0] - Amount of milliseconds that the initialization should be delayed, defaults to 0
 * @param [crossOrigin=undefined] - `crossOrigin` attribute value to use for the `<script>` tag, defaults to `undefined`
 * @param [onLoad=undefined] - Called when the Messenger script has been loaded successfully, defaults to `undefined`.
 * @param [onLoadFailed=undefined] - Called when the Messenger script has failed to load, defaults to `undefined`.
 *
 * @see {@link https://developers.intercom.com/installing-intercom/docs/basic-javascript}
 */
const initialize = (
  appId: string,
  timeout = 0,
  crossOrigin: string | undefined = undefined,
  onLoad: () => void = undefined,
  onLoadFailed: () => void = undefined,
) => {
  var w = window;
  var ic = w.Intercom;
  if (typeof ic === 'function') {
    ic('reattach_activator');
    ic('update', w.intercomSettings);
  } else {
    var d = document;
    var i = function () {
      i.c(arguments);
    };
    i.q = [];
    i.c = function (args) {
      i.q.push(args);
    };
    w.Intercom = i;
    var l = function () {
      setTimeout(function () {
        var s = d.createElement('script');
        s.crossOrigin = crossOrigin;
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://widget.intercom.io/widget/' + appId;
        if (onLoad) {
          s.addEventListener('load', () => {
            onLoad();
          });
        }
        if (onLoadFailed) {
          s.addEventListener('error', () => {
            // No need to pass any information from the ErrorEvent because it will contain no information about the error.
            onLoadFailed();
          });
        }
        var x = d.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
      }, timeout);
    };
    if (document.readyState === 'complete') {
      l();
    } else if (w.attachEvent) {
      w.attachEvent('onload', l);
    } else {
      w.addEventListener('load', l, false);
    }
  }
};

export default initialize;
