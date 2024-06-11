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

const RawUseIntercomPage = () => {
  return (
    <Grid>
      <Item>
        <p>
          Intercom will be initialized with{' '}
          <code>crossOrigin: "anonymous"</code> (and autobooted)
        </p>
      </Item>
    </Grid>
  );
};

const UseIntercomWithCrossOriginPage = () => {
  return (
    <IntercomProvider appId="jcabc7e3" autoBoot crossOrigin="anonymous">
      <RawUseIntercomPage />
    </IntercomProvider>
  );
};

export default UseIntercomWithCrossOriginPage;
