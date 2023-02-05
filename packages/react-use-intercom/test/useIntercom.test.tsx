import { act, renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { IntercomProvider, useIntercom } from '../src';
import { config } from './config';

const intercomAppId = config.intercomAppId;

describe('useIntercom', () => {
  test('should be available when wrapped in context', () => {
    const { result } = renderHook<
      { children: React.ReactNode },
      ReturnType<typeof useIntercom>
    >(() => useIntercom(), {
      wrapper: ({ children }) => (
        <IntercomProvider appId={intercomAppId}>{children}</IntercomProvider>
      ),
    });

    act(() => {
      result.current.boot();
    });

    expect(window.intercomSettings).toBeDefined();
  });

  test('should set `window.intercomSettings.appId` on boot', () => {
    const { result } = renderHook<
      { children: React.ReactNode },
      ReturnType<typeof useIntercom>
    >(() => useIntercom(), {
      wrapper: ({ children }) => (
        <IntercomProvider appId={intercomAppId}>{children}</IntercomProvider>
      ),
    });

    const { boot } = result.current;

    act(() => {
      boot();
    });

    expect(window.intercomSettings).toEqual({ app_id: intercomAppId });
  });

  test.skip('should await a certain amount on delayed initialization', async () => {
    const onShow = jest.fn();

    const { result } = renderHook<
      { children: React.ReactNode },
      ReturnType<typeof useIntercom>
    >(() => useIntercom(), {
      wrapper: ({ children }) => (
        <IntercomProvider
          appId={intercomAppId}
          autoBootProps={{
            name: 'hello',
          }}
          autoBoot
          onShow={onShow}
        >
          {children}
        </IntercomProvider>
      ),
    });

    act(() => {
      result.current.show();
      expect(onShow).toBeCalledTimes(1);
    });
  });

  it('should remove `window.intercomSettings` on shutdown', () => {
    const { result } = renderHook<
      { children: React.ReactNode },
      ReturnType<typeof useIntercom>
    >(() => useIntercom(), {
      wrapper: ({ children }) => (
        <IntercomProvider appId={intercomAppId}>{children}</IntercomProvider>
      ),
    });

    act(() => {
      result.current.boot();
      result.current.shutdown();
    });

    expect(window.intercomSettings).toEqual(undefined);
  });
});
