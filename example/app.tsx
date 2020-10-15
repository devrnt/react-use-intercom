import * as React from 'react';
import styled from 'styled-components';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';

import {
  ProviderPage,
  UseIntercomPage,
  ProviderEventsPage,
  ProviderApiPage,
  UseIntercomTourPage,
} from './modules';

import { Page, Style } from './modules/common';

const Navigation = styled.ul`
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 1.75rem;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: var(--dark);

  &:visited,
  &:active {
    text-decoration: none;
  }

  > code {
    font-size: 1rem;
  }
`;

const App = () => {
  return (
    <>
      <Style />
      <Page
        title="react-use-intercom"
        description="Example playground to showcase the functionalities of this package"
      >
        <Router>
          <Route path="/provider" component={ProviderPage} />
          <Route path="/providerEvents" component={ProviderEventsPage} />
          <Route path="/providerApi" component={ProviderApiPage} />
          <Route path="/useIntercom" component={UseIntercomPage} />
          <Route path="/useIntercomTour" component={UseIntercomTourPage} />
          <Route path="/" exact>
            <Navigation>
              <Link to="/provider">
                <code>IntercomProvider</code>
              </Link>
              <Link to="/providerEvents">
                <code>IntercomProvider with event callbacks</code>
              </Link>
              <Link to="/useIntercom">
                <code>useIntercom</code>
              </Link>
              <Link to="/useIntercomTour">
                <code>useIntercom with tour</code>
              </Link>
            </Navigation>
          </Route>
        </Router>
      </Page>
    </>
  );
};

export default App;
