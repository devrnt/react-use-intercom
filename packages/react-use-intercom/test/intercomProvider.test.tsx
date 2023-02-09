import { act, render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { IntercomProvider, useIntercom } from '../src';
import { config } from './config';

const intercomAppId = config.intercomAppId;

describe('IntercomProvider', () => {
  test('should render children', () => {
    const { getByText } = render(
      <div>
        <IntercomProvider appId={intercomAppId}>children</IntercomProvider>
      </div>,
    );

    expect(getByText('children')).toBeDefined();
  });

  test('should set `window.Intercom` on initialize', () => {
    render(
      <div>
        <IntercomProvider appId={intercomAppId}>children</IntercomProvider>
      </div>,
    );

    expect(window.Intercom).toBeDefined();
  });

  test('should not call `onShow` callback when not calling `show`', () => {
    const mockOnShow = jest.fn();

    renderHook<{ children: React.ReactNode }, ReturnType<typeof useIntercom>>(
      () => useIntercom(),
      {
        wrapper: ({ children }) => (
          <IntercomProvider appId={intercomAppId} onShow={mockOnShow} autoBoot>
            {children}
          </IntercomProvider>
        ),
      },
    );

    expect(mockOnShow).not.toBeCalled();
  });

  test('should set `window.intercomSettings.apiBase` on autoBoot', () => {
    const apiBase = `https://${intercomAppId}.intercom-messenger.com`;

    const { result } = renderHook<
      { children: React.ReactNode },
      ReturnType<typeof useIntercom>
    >(() => useIntercom(), {
      wrapper: ({ children }) => (
        <IntercomProvider appId={intercomAppId} apiBase={apiBase}>
          {children}
        </IntercomProvider>
      ),
    });

    const { boot } = result.current;

    act(() => {
      boot();
    });

    expect(window.intercomSettings).toEqual({
      app_id: intercomAppId,
      api_base: apiBase,
    });
  });

  test('should pass props when `autoBootProps` is passed', () => {
    const phone = '123456';

    renderHook<{ children: React.ReactNode }, ReturnType<typeof useIntercom>>(
      () => useIntercom(),
      {
        wrapper: ({ children }) => (
          <IntercomProvider
            appId={intercomAppId}
            autoBootProps={{
              phone,
            }}
            autoBoot
          >
            {children}
          </IntercomProvider>
        ),
      },
    );

    expect(window.intercomSettings).toEqual({
      app_id: intercomAppId,
      phone,
    });
  });

  test('should not pass props when `autoBootProps` is passed and `autoBoot` is `false`', () => {
    const phone = '123456';

    const { result } = renderHook<
      { children: React.ReactNode },
      ReturnType<typeof useIntercom>
    >(() => useIntercom(), {
      wrapper: ({ children }) => (
        <IntercomProvider
          appId={intercomAppId}
          autoBoot={false}
          autoBootProps={{
            phone,
          }}
        >
          {children}
        </IntercomProvider>
      ),
    });

    act(() => {
      result.current.boot();
    });

    expect(window.intercomSettings).toEqual({
      app_id: intercomAppId,
    });
  });

  test('should console.warn when invalid prop is passed', () => {
    console.warn = jest.fn();
    const invalidPropName = 'invalidProp';

    render(
      <div>
        <IntercomProvider
          appId={intercomAppId}
          {...{ [invalidPropName]: 'invalid' }}
        >
          children
        </IntercomProvider>
      </div>,
    );

    expect(console.warn).toHaveBeenCalledWith(
      `[react-use-intercom] some invalid props were passed to IntercomProvider. Please check following props: ${invalidPropName}.`,
    );
  });

  test('should not console.warn when data-x attributes are passed as prop', () => {
    console.warn = jest.fn();
    const dataAttributePropName = 'data-my-attribute';

    render(
      <div>
        <IntercomProvider
          appId={intercomAppId}
          {...{ [dataAttributePropName]: 'valid' }}
        >
          children
        </IntercomProvider>
      </div>,
    );

    expect(console.warn).not.toHaveBeenCalled();
  });
});
