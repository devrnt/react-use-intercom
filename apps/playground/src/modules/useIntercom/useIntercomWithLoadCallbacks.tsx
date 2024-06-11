import { useState } from 'react';
import * as React from 'react';
import { IntercomProvider } from 'react-use-intercom';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;
`;

const Item = styled.div`
  display: grid;
  grid-template-rows: min-content;

  &::after {
    content: '';
    margin: 2rem 0 1.5rem;
    border-bottom: 2px solid var(--grey);
    width: 100%;
  }
`;

const RawUseIntercomPage = ({ call }: { call: string | undefined }) => {
  return (
    <Grid>
      <Item>
        <p>
          The Intercom Messenger script will be loaded and{' '}
          <code>onLoad/onLoadFailed</code> be called
        </p>
        <p data-cy="call">{call ?? 'Waiting…'}</p>
      </Item>
    </Grid>
  );
};

const UseIntercomWithLoadCallbacks = () => {
  const [call, setCall] = useState<string>();

  return (
    <IntercomProvider
      appId="jcabc7e3"
      autoBoot
      onLoad={() => setCall('onLoad was called!')}
      onLoadFailed={() => setCall('onLoadFailed was called!')}
    >
      <RawUseIntercomPage call={call} />
    </IntercomProvider>
  );
};

export default UseIntercomWithLoadCallbacks;
