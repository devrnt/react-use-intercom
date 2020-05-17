import * as React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

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

describe('useIntercom', () => {
  test('should be available when wrapped in context', () => {
    const { result } = renderHook(() => useIntercom(), {
      wrapper: ({ children }) => (
        <IntercomProvider appId={INTERCOM_APP_ID}>{children}</IntercomProvider>
      ),
    });

    act(() => {
      result.current.boot();
    });

    expect(window.intercomSettings).toBeDefined();
  });

  test('should set `window.intercomSettings.appId` on boot', () => {
    const { result } = renderHook(() => useIntercom(), {
      wrapper: ({ children }) => (
        <IntercomProvider appId={INTERCOM_APP_ID}>{children}</IntercomProvider>
      ),
    });

    const { boot } = result.current;

    act(() => {
      boot();
    });

    expect(window.intercomSettings).toEqual({ app_id: INTERCOM_APP_ID });
  });
});
