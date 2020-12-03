import * as React from 'react';

import * as logger from './logger';
import { IntercomContextValues } from './types';

const NO_INTERCOM_PROVIDER_MESSAGE =
  'Please wrap your component with `IntercomProvider`.';

const IntercomContext = React.createContext<IntercomContextValues>({
  boot: () => logger.log('error', NO_INTERCOM_PROVIDER_MESSAGE),
  shutdown: () => logger.log('error', NO_INTERCOM_PROVIDER_MESSAGE),
  hardShutdown: () => logger.log('error', NO_INTERCOM_PROVIDER_MESSAGE),
  update: () => logger.log('error', NO_INTERCOM_PROVIDER_MESSAGE),
  hide: () => logger.log('error', NO_INTERCOM_PROVIDER_MESSAGE),
  show: () => logger.log('error', NO_INTERCOM_PROVIDER_MESSAGE),
  showMessages: () => logger.log('error', NO_INTERCOM_PROVIDER_MESSAGE),
  showNewMessages: () => logger.log('error', NO_INTERCOM_PROVIDER_MESSAGE),
  getVisitorId: () => {
    logger.log('error', NO_INTERCOM_PROVIDER_MESSAGE);
    return '';
  },
  startTour: () => logger.log('error', NO_INTERCOM_PROVIDER_MESSAGE),
  trackEvent: () => logger.log('error', NO_INTERCOM_PROVIDER_MESSAGE),
});

export default IntercomContext;
