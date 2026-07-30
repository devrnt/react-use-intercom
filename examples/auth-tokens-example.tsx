import React from 'react';
import { IntercomProvider, useIntercom } from 'react-use-intercom';

function MyApp() {
  const { boot } = useIntercom();

  const handleLogin = () => {
    // After successful login, boot Intercom with auth tokens
    boot({
      email: 'john.doe@example.com',
      createdAt: 1234567890,
      name: 'John Doe',
      userId: '9876',
      authTokens: {
        security_token: 'abc...', // Your JWT token
        // You can add any other tokens as key-value pairs
        api_token: 'xyz...',
        custom_token: '123...'
      }
    });
  };

  return (
    <div>
      <h1>Intercom Auth Tokens Example</h1>
      <button onClick={handleLogin}>Login and Boot Intercom</button>
    </div>
  );
}

export default function App() {
  return (
    <IntercomProvider appId="your-app-id">
      <MyApp />
    </IntercomProvider>
  );
}