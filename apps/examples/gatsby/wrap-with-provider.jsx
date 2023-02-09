import * as React from 'react';
import { IntercomProvider } from 'react-use-intercom';

const INTERCOM_APP_ID = 'jcabc7e3';

export default ({ element }) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  return <IntercomProvider appId={INTERCOM_APP_ID}>{element}</IntercomProvider>;
};
