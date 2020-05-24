import * as React from 'react';

import * as logger from './logger';
import initialize from './initialize';
import IntercomContext from './context';
import { IntercomContextValues, IntercomProviderProps } from './contextTypes';
import { IntercomAPI } from './intercom';
import { IntercomProps, RawIntercomBootProps } from './types';
import { mapIntercomPropsToRawIntercomProps } from './mappers';
import { isEmptyObject } from './utils';

export const IntercomProvider = ({
  appId,
  autoBoot = false,
  children,
  onHide,
  onShow,
  onUnreadCountChange,
  ...rest
}: IntercomProviderProps) => {
  if (!isEmptyObject(rest))
    logger.log(
      'error',
      [
        'some invalid props were passed to IntercomProvider. ',
        `Please check following props: ${Object.keys(rest).join(', ')}.`,
      ].join(''),
    );

  const [isBooted, setIsBooted] = React.useState(autoBoot);

  if (!window.Intercom) {
    initialize(appId);
    // Only add listeners on initialization
    if (onHide) IntercomAPI('onHide', onHide);
    if (onShow) IntercomAPI('onShow', onShow);
    if (onUnreadCountChange)
      IntercomAPI('onUnreadCountChange', onUnreadCountChange);

    if (autoBoot) {
      IntercomAPI('boot', { app_id: appId });
      window.intercomSettings = { app_id: appId };
    }
  }

  const ensureIntercomIsBooted = React.useCallback(
    (functionName: string = 'A function', callback: Function) => {
      if (!isBooted) {
        logger.log(
          'warn',
          [
            `'${functionName}' was called but Intercom has not booted yet. `,
            `Please call 'boot' before calling '${functionName}' or `,
            `set 'autoBoot' to true in the IntercomProvider.`,
          ].join(''),
        );
        return;
      }
      return callback();
    },
    [isBooted],
  );

  const boot = React.useCallback(
    (props?: IntercomProps) => {
      if (isBooted) return;

      const metaData: RawIntercomBootProps = {
        app_id: appId,
        ...(props && mapIntercomPropsToRawIntercomProps(props)),
      };

      window.intercomSettings = metaData;
      IntercomAPI('boot', metaData);
      setIsBooted(true);
    },
    [appId, isBooted],
  );

  const shutdown = React.useCallback(() => {
    if (!isBooted) return;

    IntercomAPI('shutdown');
    setIsBooted(false);
  }, [isBooted]);

  const hardShutdown = React.useCallback(() => {
    if (!isBooted) return;

    IntercomAPI('shutdown');
    delete window.Intercom;
    delete window.intercomSettings;
    setIsBooted(false);
  }, [isBooted]);

  const refresh = React.useCallback(() => {
    ensureIntercomIsBooted('update', () => {
      const lastRequestedAt = new Date().getTime();
      IntercomAPI('update', { last_requested_at: lastRequestedAt });
    });
  }, [ensureIntercomIsBooted]);

  const update = React.useCallback(
    (props?: IntercomProps) => {
      ensureIntercomIsBooted('update', () => {
        if (!props) {
          refresh();
          return;
        }
        const rawProps = mapIntercomPropsToRawIntercomProps(props);
        window.intercomSettings = { ...window.intercomSettings, ...rawProps };
        IntercomAPI('update', rawProps);
      });
    },
    [ensureIntercomIsBooted, refresh],
  );

  const hide = React.useCallback(() => {
    ensureIntercomIsBooted('hide', () => {
      IntercomAPI('hide');
    });
  }, [ensureIntercomIsBooted]);

  const show = React.useCallback(() => {
    ensureIntercomIsBooted('show', () => IntercomAPI('show'));
  }, [ensureIntercomIsBooted]);

  const showMessages = React.useCallback(() => {
    ensureIntercomIsBooted('showMessages', () => {
      IntercomAPI('showMessages');
    });
  }, [ensureIntercomIsBooted]);

  const showNewMessages = React.useCallback(
    (message?: string) => {
      ensureIntercomIsBooted('showNewMessage', () => {
        if (!message) {
          IntercomAPI('showNewMessage');
        } else {
          IntercomAPI('showNewMessage', message);
        }
      });
    },
    [ensureIntercomIsBooted],
  );

  const getVisitorId = React.useCallback(() => {
    return ensureIntercomIsBooted('getVisitorId', () => {
      return (IntercomAPI('getVisitorId') as unknown) as string;
    });
  }, [ensureIntercomIsBooted]);

  const startTour = React.useCallback(
    (tourId: number) => {
      ensureIntercomIsBooted('startTour', () => {
        IntercomAPI('startTour', tourId);
      });
    },
    [ensureIntercomIsBooted],
  );

  const trackEvent = React.useCallback(
    (event: string, metaData?: object) => {
      ensureIntercomIsBooted('trackEvent', () => {
        if (metaData) {
          IntercomAPI('trackEvent', event, metaData);
        } else {
          IntercomAPI('trackEvent', event);
        }
      });
    },
    [ensureIntercomIsBooted],
  );

  const providerValue = React.useMemo<IntercomContextValues>(() => {
    return {
      boot,
      shutdown,
      hardShutdown,
      update,
      hide,
      show,
      showMessages,
      showNewMessages,
      getVisitorId,
      startTour,
      trackEvent,
    };
  }, [
    boot,
    shutdown,
    hardShutdown,
    update,
    hide,
    show,
    showMessages,
    showNewMessages,
    getVisitorId,
    startTour,
    trackEvent,
  ]);

  const content = React.useMemo(() => children, [children]);

  return (
    <IntercomContext.Provider value={providerValue}>
      {content}
    </IntercomContext.Provider>
  );
};

export const useIntercomContext = () => React.useContext(IntercomContext);
