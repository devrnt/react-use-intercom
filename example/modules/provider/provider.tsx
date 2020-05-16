import * as React from 'react';

import { IntercomProvider } from '../../../.';

const Provider = () => {
  return (
    <>
      <h3>IntercomProvider</h3>
      {/* TODO: move appId */}
      <IntercomProvider appId="jcabc7e3" autoBoot>
        <p>Intercom children</p>
      </IntercomProvider>
    </>
  );
};

export default Provider;
