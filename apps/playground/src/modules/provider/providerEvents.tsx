import * as React from 'react';
import styled from 'styled-components';

import { IntercomProvider, useIntercom } from 'react-use-intercom';
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
};

const RawProviderEvents = ({
  onShowText,
  onHideText,
}: RawProviderEventsProps) => {
  const { boot, show, hide } = useIntercom();

  return (
    <>
      <p>Intercom children</p>
      <p data-cy="onShowText">{onShowText}</p>
      <p data-cy="onHideText">{onHideText}</p>

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

  const onShow = React.useCallback(() => setOnShowText('show was called'), []);
  const onHide = React.useCallback(() => setHideText('hide was called'), []);

  return (
    <IntercomProvider appId="jcabc7e3" onShow={onShow} onHide={onHide}>
      <RawProviderEvents onShowText={onShowText} onHideText={onHideText} />
    </IntercomProvider>
  );
};

export default ProviderEvents;
