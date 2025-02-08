import { useEffect } from 'react';
import { IntercomProvider, useIntercom } from 'react-use-intercom';

const INTERCOM_APP_ID = 'jcabc7e3';

export function App() {
  return (
    <IntercomProvider
      appId={INTERCOM_APP_ID}
      autoBoot
      onShow={() => alert('show')}
    >
      <OurApp />
    </IntercomProvider>
  );
}

function OurApp() {
  return (
    <main>
      <p>Our App</p>
      <TrackEvent />
    </main>
  );
}

function TrackEvent() {
  const { trackEvent, boot, shutdown } = useIntercom();

  useEffect(() => {
    trackEvent('event');
  }, [trackEvent]);

  return (
    <>
      <p>Tracing event in effect</p>
      <button onClick={() => boot()}>Boot</button>
      <button onClick={() => shutdown()}>Shutdown</button>
    </>
  );
}

export default App;
