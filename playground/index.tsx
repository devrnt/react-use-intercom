import 'react-app-polyfill/ie11';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './app';

const Root = () => <App />;

ReactDOM.render(<Root />, document.getElementById('root'));
