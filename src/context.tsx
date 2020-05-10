import { createContext } from 'react';

import { IntercomContextValues } from './contextTypes';

const IntercomContext = createContext<IntercomContextValues>({
  boot: () => null,
  shutdown: () => null,
  hardShutdown: () => null,
  update: () => null,
  hide: () => null,
  refresh: () => null,
  show: () => null,
  showMessages: () => null,
  showNewMessages: () => null,
  getVisitorId: () => '',
  startTour: () => null,
  trackEvent: () => null,
});

export default IntercomContext;
