import * as React from 'react';

import IntercomAPI from './api';
import IntercomContext from './context';
import initialize from './initialize';
import * as logger from './logger';
import { mapIntercomPropsToRawIntercomProps } from './mappers';
import {
  IntercomContextValues,
  IntercomProps,
  IntercomProviderProps,
  RawIntercomBootProps,
} from './types';
import { isEmptyObject, isSSR } from './utils';

export const IntercomProvider: React.FC<IntercomProviderProps> = ({
  appId,
  autoBoot = false,
  autoBootProps,
  children,
  onHide,
  onShow,
  onUnreadCountChange,
  shouldInitialize = !isSSR,
  apiBase,
  initializeDelay,
  ...rest
}) => {
  const isBooted = React.useRef(false);
  const isInitialized = React.useRef(false);

  if (!isEmptyObject(rest) && __DEV__)
    logger.log(
      'error',
      [
        'some invalid props were passed to IntercomProvider. ',
        `Please check following props: ${Object.keys(rest).join(', ')}.`,
      ].join(''),
    );

  const boot = React.useCallback(
    (props?: IntercomProps) => {
      if (!window.Intercom && !shouldInitialize) {
        logger.log(
          'warn',
          'Intercom instance is not initialized because `shouldInitialize` is set to `false` in `IntercomProvider`',
        );
        return;
      }

      if (isBooted.current) {
        return;
      }

      const metaData: RawIntercomBootProps = {
        app_id: appId,
        ...(apiBase && { api_base: apiBase }),
        ...(props && mapIntercomPropsToRawIntercomProps(props)),
      };

      window.intercomSettings = metaData;
      IntercomAPI('boot', metaData);
      isBooted.current = true;
    },
    [apiBase, appId, shouldInitialize],
  );

  if (!isSSR && shouldInitialize && !isInitialized.current) {
    initialize(appId, initializeDelay);

    // attach listeners
    if (onHide) IntercomAPI('onHide', onHide);
    if (onShow) IntercomAPI('onShow', onShow);
    if (onUnreadCountChange)
      IntercomAPI('onUnreadCountChange', onUnreadCountChange);

    if (autoBoot) {
      boot(autoBootProps);
    }

    isInitialized.current = true;
  }

  const ensureIntercom = React.useCallback(
    (
      functionName: string = 'A function',
      callback: (() => void) | (() => string),
    ) => {
      if (!window.Intercom && !shouldInitialize) {
        logger.log(
          'warn',
          'Intercom instance is not initialized because `shouldInitialize` is set to `false` in `IntercomProvider`',
        );
        return;
      }
      if (!isBooted.current) {
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
    [shouldInitialize],
  );

  const shutdown = React.useCallback(() => {
    if (!isBooted.current) return;

    IntercomAPI('shutdown');
    isBooted.current = false;
  }, []);

  const hardShutdown = React.useCallback(() => {
    if (!isBooted.current) return;

    IntercomAPI('shutdown');
    delete window.Intercom;
    delete window.intercomSettings;
    isBooted.current = false;
  }, []);

  const refresh = React.useCallback(() => {
    ensureIntercom('update', () => {
      const lastRequestedAt = new Date().getTime();
      IntercomAPI('update', { last_requested_at: lastRequestedAt });
    });
  }, [ensureIntercom]);

  const update = React.useCallback(
    (props?: IntercomProps) => {
      ensureIntercom('update', () => {
        if (!props) {
          refresh();
          return;
        }
        const rawProps = mapIntercomPropsToRawIntercomProps(props);
        window.intercomSettings = { ...window.intercomSettings, ...rawProps };
        IntercomAPI('update', rawProps);
      });
    },
    [ensureIntercom, refresh],
  );

  const hide = React.useCallback(() => {
    ensureIntercom('hide', () => {
      IntercomAPI('hide');
    });
  }, [ensureIntercom]);

  const show = React.useCallback(() => {
    ensureIntercom('show', () => IntercomAPI('show'));
  }, [ensureIntercom]);

  const showMessages = React.useCallback(() => {
    ensureIntercom('showMessages', () => {
      IntercomAPI('showMessages');
    });
  }, [ensureIntercom]);

  const showNewMessages = React.useCallback(
    (message?: string) => {
      ensureIntercom('showNewMessage', () => {
        if (!message) {
          IntercomAPI('showNewMessage');
        } else {
          IntercomAPI('showNewMessage', message);
        }
      });
    },
    [ensureIntercom],
  );

  const getVisitorId = React.useCallback(() => {
    return ensureIntercom('getVisitorId', () => {
      return IntercomAPI('getVisitorId');
    }) as string;
  }, [ensureIntercom]);

  const startTour = React.useCallback(
    (tourId: number) => {
      ensureIntercom('startTour', () => {
        IntercomAPI('startTour', tourId);
      });
    },
    [ensureIntercom],
  );

  const trackEvent = React.useCallback(
    (event: string, metaData?: object) => {
      ensureIntercom('trackEvent', () => {
        if (metaData) {
          IntercomAPI('trackEvent', event, metaData);
        } else {
          IntercomAPI('trackEvent', event);
        }
      });
    },
    [ensureIntercom],
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

  return (
    <IntercomContext.Provider value={providerValue}>
      {children}
    </IntercomContext.Provider>
  );
};

export const useIntercomContext = () => {
  const context = React.useContext(IntercomContext);

  if (__DEV__) {
    if (context === undefined) {
      throw new Error('`useIntercom` must be used within `IntercomProvider`.');
    }
  }

  return context as IntercomContextValues;
};
