import * as React from 'react';
import styled from 'styled-components';

import { IntercomProvider, useIntercom } from '../../../.';

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

const RawUseIntercomPage = () => {
  const {
    boot,
  } = useIntercom();
  const handleBoot = React.useCallback(() => boot(), [boot]);

  return (
    <Grid>
      <Item>
        <p>
          Intercom will be autobooted after 5000ms
        </p>
      </Item>
    </Grid>
  );
};

const UseIntercomWithDelayPage = () => {
  return (
    <IntercomProvider appId="jcabc7e3" initializeDelay={5000} autoBoot>
      <RawUseIntercomPage />
    </IntercomProvider>
  );
};

export default UseIntercomWithDelayPage;
