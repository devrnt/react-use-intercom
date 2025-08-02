import * as React from 'react';
import { act, renderHook } from '@testing-library/react';

import { IntercomProvider, useIntercom } from '../src';

describe('auth_tokens', () => {
  it('should pass auth_tokens during boot', () => {
    const appId = 'app123';
    const mockIntercom = jest.fn();
    (window as any).Intercom = mockIntercom;
    (window as any).intercomSettings = undefined;

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <IntercomProvider appId={appId}>{children}</IntercomProvider>
    );

    const { result } = renderHook(() => useIntercom(), { wrapper });

    act(() => {
      result.current.boot({
        email: 'john.doe@example.com',
        createdAt: 1234567890,
        name: 'John Doe',
        userId: '9876',
        authTokens: {
          security_token: 'abc123',
          another_token: 'xyz789',
        },
      });
    });

    expect(mockIntercom).toHaveBeenCalledWith('boot', {
      app_id: appId,
      email: 'john.doe@example.com',
      created_at: 1234567890,
      name: 'John Doe',
      user_id: '9876',
      auth_tokens: {
        security_token: 'abc123',
        another_token: 'xyz789',
      },
    });
  });

  it('should pass auth_tokens during update', () => {
    const appId = 'app123';
    const mockIntercom = jest.fn();
    (window as any).Intercom = mockIntercom;
    (window as any).intercomSettings = { app_id: appId };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <IntercomProvider appId={appId} autoBoot>{children}</IntercomProvider>
    );

    const { result } = renderHook(() => useIntercom(), { wrapper });

    act(() => {
      result.current.update({
        authTokens: {
          security_token: 'updated_token',
        },
      });
    });

    // Find the update call (not the boot or event handler calls)
    const updateCalls = mockIntercom.mock.calls.filter(call => call[0] === 'update');
    const lastUpdateCall = updateCalls[updateCalls.length - 1];
    expect(lastUpdateCall).toBeDefined();
    expect(lastUpdateCall[1]).toMatchObject({
      auth_tokens: {
        security_token: 'updated_token',
      },
    });
  });
});