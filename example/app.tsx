import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { normalize } from 'styled-normalize';

import { ProviderPage, UseIntercomPage } from './modules';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  html {
    font-size: 15px;
  }

  body {
    font-family: 'Hind', Helvetica, sans-serif;
  }

  code {
    font-family: 'Fira Code', monospace;
    font-size: 0.95rem;
  }
`;

const Navigation = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <h1>react-use-intercom</h1>
      <p>This main page contains short desc of the library</p>
      <Router>
        <Route path="/provider" component={ProviderPage} />
        <Route path="/useIntercom" component={UseIntercomPage} />
        <Route path="/" exact>
          <Navigation>
            <NavLink to="/provider">
              <code>IntercomProvider</code>
            </NavLink>
            <NavLink to="/useIntercom">
              <code>useIntercom</code>
            </NavLink>
          </Navigation>
        </Route>
      </Router>
    </>
  );
};

export default App;
