'use client';

import { IntercomProvider } from 'react-use-intercom';

const INTERCOM_APP_ID = 'jcabc7e3';

export function OurIntercomProvider({ children }) {
  return (
    <html lang="en">
      <body>
        <IntercomProvider appId={INTERCOM_APP_ID}>
          {children}
        </IntercomProvider>
      </body>
    </html>
  );
}
