import { act, render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import config from '../config';
import { IntercomProvider, useIntercom } from '../src';

const INTERCOM_APP_ID = config.INTERCOM_APP_ID;

// TODO: move this
declare global {
  interface Window {
    Intercom: any;
    intercomSettings: any;
  }
}

describe('IntercomProvider', () => {
  test('should render children', () => {
    const { getByText } = render(
      <div>
        <IntercomProvider appId={INTERCOM_APP_ID}>children</IntercomProvider>
      </div>,
    );

    expect(getByText('children')).toBeDefined();
  });

  test('should set `window.Intercom` on initialize', () => {
    render(
      <div>
        <IntercomProvider appId={INTERCOM_APP_ID}>children</IntercomProvider>
      </div>,
    );

    expect(window.Intercom).toBeDefined();
  });

  test('should not call `onShow` callback when not calling `show`', () => {
    const mockOnShow = jest.fn();

    renderHook(() => useIntercom(), {
      wrapper: ({ children }) => (
        <IntercomProvider appId={INTERCOM_APP_ID} onShow={mockOnShow} autoBoot>
          {children}
        </IntercomProvider>
      ),
    });

    expect(mockOnShow).not.toBeCalled();
  });

  test('should set `window.intercomSettings.apiBase` on autoBoot', () => {
    const apiBase = `https://${INTERCOM_APP_ID}.intercom-messenger.com`;

    const { result } = renderHook(() => useIntercom(), {
      wrapper: ({ children }) => (
        <IntercomProvider appId={INTERCOM_APP_ID} apiBase={apiBase}>
          {children}
        </IntercomProvider>
      ),
    });

    const { boot } = result.current;

    act(() => {
      boot();
    });

    expect(window.intercomSettings).toEqual({
      app_id: INTERCOM_APP_ID,
      api_base: apiBase,
    });
  });

  test('should pass props when `autoBootProps` is passed', () => {
    const phone = '123456';

    renderHook(() => useIntercom(), {
      wrapper: ({ children }) => (
        <IntercomProvider
          appId={INTERCOM_APP_ID}
          autoBootProps={{
            phone,
          }}
          autoBoot
        >
          {children}
        </IntercomProvider>
      ),
    });

    expect(window.intercomSettings).toEqual({
      app_id: INTERCOM_APP_ID,
      phone,
    });
  });

  test('should not pass props when `autoBootProps` is passed and `autoBoot` is `false`', () => {
    const phone = '123456';

    const { result } = renderHook(() => useIntercom(), {
      wrapper: ({ children }) => (
        <IntercomProvider
          appId={INTERCOM_APP_ID}
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
      app_id: INTERCOM_APP_ID,
    });
  });

  test('should console.warn when invalid prop is passed', () => {
    console.warn = jest.fn();
    const invalidPropName = 'invalidProp';

    render(
      <div>
        <IntercomProvider
          appId={INTERCOM_APP_ID}
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
          appId={INTERCOM_APP_ID}
          {...{ [dataAttributePropName]: 'valid' }}
        >
          children
        </IntercomProvider>
      </div>,
    );

    expect(console.warn).not.toHaveBeenCalled();
  });
});
