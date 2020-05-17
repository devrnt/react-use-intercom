import * as React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

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

  test('should set `window.intercomSettings` on initialize', () => {
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
});
