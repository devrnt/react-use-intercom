import * as React from 'react';

import { IntercomProvider } from 'react-use-intercom';

const Provider = () => {
  return (
    <IntercomProvider
      appId="jcabc7e3"
      apiBase="https://jcabc7e3.intercom-messenger.com"
      autoBoot
    >
      <p>Intercom children</p>
    </IntercomProvider>
  );
};

export default Provider;
