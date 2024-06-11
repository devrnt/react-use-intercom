import * as React from 'react';
import { HashRouter as Router, NavLink, Route } from 'react-router-dom';
import styled from 'styled-components';

import {
  ProviderApiPage,
  ProviderAutoBootProps,
  ProviderEventsPage,
  ProviderPage,
  UseIntercomPage,
  UseIntercomTourPage,
  UseIntercomWithCrossOrigin,
  UseIntercomWithDelay,
  UseIntercomWithLoadCallbacks,
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
        description="Playground to showcase the functionalities of this package"
      >
        <Router>
          <Route path="/provider" component={ProviderPage} />
          <Route path="/providerEvents" component={ProviderEventsPage} />
          <Route path="/providerApi" component={ProviderApiPage} />
          <Route
            path="/providerAutoBootProps"
            component={ProviderAutoBootProps}
          />
          <Route path="/useIntercom" component={UseIntercomPage} />
          <Route path="/useIntercomTour" component={UseIntercomTourPage} />
          <Route
            path="/useIntercomWithCrossOrigin"
            component={UseIntercomWithCrossOrigin}
          />
          <Route
            path="/useIntercomWithLoadCallbacks"
            component={UseIntercomWithLoadCallbacks}
          />
          <Route
            path="/useIntercomWithTimeout"
            component={UseIntercomWithDelay}
          />
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
              <Link to="/useIntercomWithCrossOrigin">
                <code>useIntercom with crossOrigin</code>
              </Link>
              <Link to="/useIntercomWithTimeout">
                <code>useIntercom with delayed boot</code>
              </Link>
              <Link to="/useIntercomWithLoadCallbacks">
                <code>useIntercom with load callbacks</code>
              </Link>
            </Navigation>
          </Route>
        </Router>
      </Page>
    </>
  );
};

export default App;
