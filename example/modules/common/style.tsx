import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  :root {
    --light: #ffffff;
    --dark: #181818;
    --cyan: #6afdef;
    --grey: #f4f0eb;
  }

  html {
    font-size: 15px;
  }

  h1, 
  h2, 
  h3,
  h4,
  h5,
  h6,
  p {
    color: var(--dark);
    line-height: 1.75rem;
  }

  body {
    font-family: 'Hind', Helvetica, sans-serif;
    text-rendering: optimizeLegibility;
  }

  code {
    background: var(--grey);
    border-radius: 2px;
    font-family: 'Fira Code', monospace;
    font-size: 0.825rem;
    padding: 0.075rem 0.35rem;
  }
`;

const Style = () => (
  <>
    <Normalize />
    <GlobalStyle />
  </>
);

export default Style;
