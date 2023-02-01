import * as React from 'react';
import styled from 'styled-components';

import { IntercomProvider, useIntercom } from 'react-use-intercom';
import { Button } from '../common';

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

const RawUseIntercomStartPagePage = () => {
  const { boot, shutdown, hardShutdown, startTour } = useIntercom();

  const handleBoot = React.useCallback(() => boot({ name: 'Russo' }), [boot]);

  const handleStartTour = React.useCallback(() => {
    startTour(124247);
  }, [startTour]);

  return (
    <Grid>
      <Item>
        <p>
          starts a tour based on the <code>tourId</code>
        </p>
        <Button label="Start tour" onClick={handleStartTour}>
          Start tour
        </Button>
      </Item>
      <Item>
        <p>
          boots the Intercom instance, not needed if <code>autoBoot</code> in{' '}
          <code>IntercomProvider</code> is <code>true</code>
        </p>
        <Button label="Boot" data-cy="boot" onClick={() => boot()} />
      </Item>
      <Item>
        <p>
          boots the Intercom instance with given <code>props</code>
        </p>
        <Button label="Boot props" data-cy="boot-seeded" onClick={handleBoot} />
      </Item>
      <Item>
        <p>shuts down the Intercom instance</p>
        <Button label="Shutdown" data-cy="shutdown" onClick={shutdown} />
      </Item>
      <Item>
        <p>
          same functionality as <code>shutdown</code>, but makes sure the
          Intercom cookies, <code>window.Intercom</code> and{' '}
          <code>window.intercomSettings</code> are removed
        </p>
        <Button
          label="Shutdown hard"
          data-cy="shutdown-hard"
          onClick={hardShutdown}
        />
      </Item>
    </Grid>
  );
};

const UseIntercomTourPage = () => {
  return (
    <IntercomProvider appId="jcabc7e3" autoBoot>
      <RawUseIntercomStartPagePage />
    </IntercomProvider>
  );
};

export default UseIntercomTourPage;
