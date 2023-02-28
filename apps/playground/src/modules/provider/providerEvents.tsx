import * as React from 'react';
import { IntercomProvider, useIntercom } from 'react-use-intercom';
import styled from 'styled-components';

import { Button } from '../common';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;
`;

const Item = styled.div`
  display: grid;
  grid-template-rows: min-content;

  &::after {
    content: '';
    margin: 2rem 0 1.5rem;
    border-bottom: 2px solid var(--grey);
    width: 100%;
  }
`;

type RawProviderEventsProps = {
  onShowText: string;
  onHideText: string;
  onUserEmailSuppliedText: string;
};

const RawProviderEvents = ({
  onShowText,
  onHideText,
  onUserEmailSuppliedText,
}: RawProviderEventsProps) => {
  const { boot, show, hide } = useIntercom();

  return (
    <>
      <p>Intercom children</p>
      <p data-cy="onShowText">{onShowText}</p>
      <p data-cy="onHideText">{onHideText}</p>
      <p data-cy="onUserEmailSuppliedText">{onUserEmailSuppliedText}</p>

      <Grid>
        <Item>
          <p>Just boot the Intercom</p>
          <Button label="Boot" data-cy="boot" onClick={() => boot()} />
        </Item>
        <Item>
          <p>click should update the `onShow` text</p>
          <Button label="Show" data-cy="show" onClick={show} />
        </Item>

        <Item>
          <p>click should update the `onHide` text</p>
          <Button label="Hide" data-cy="hide" onClick={hide} />
        </Item>
      </Grid>
    </>
  );
};

const ProviderEvents = () => {
  const [onShowText, setOnShowText] = React.useState('default');
  const [onHideText, setHideText] = React.useState('default');
  const [onUserEmailSuppliedText, setOnUserEmailSupplied] =
    React.useState('default');

  const onShow = React.useCallback(() => setOnShowText('show was called'), []);
  const onHide = React.useCallback(() => setHideText('hide was called'), []);
  const onUserEmailSupplied = () =>
    setOnUserEmailSupplied('on user email supplied was called');

  return (
    <IntercomProvider
      appId="jcabc7e3"
      onShow={onShow}
      onHide={onHide}
      onUserEmailSupplied={onUserEmailSupplied}
    >
      <RawProviderEvents
        onUserEmailSuppliedText={onUserEmailSuppliedText}
        onShowText={onShowText}
        onHideText={onHideText}
      />
    </IntercomProvider>
  );
};

export default ProviderEvents;
