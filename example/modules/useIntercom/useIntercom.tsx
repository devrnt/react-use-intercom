import * as React from 'react';
import styled from 'styled-components';

import { IntercomProvider, useIntercom } from '../../../.';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
`;

const Button = styled.button`
  border: none;
  padding: 1rem 3rem;
  border-radius: 10px;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1.25px;
  word-spacing: 1px;
  font-size: 0.8rem;
  font-weight: 500;
  background-image: linear-gradient(to right, #48a4fb, #05e1f9);
  cursor: pointer;

  &:active,
  &:focus,
  &:hover {
    background-image: linear-gradient(to right, #45e87b, #45f3dc);
  }
  /* background-image: linear-gradient(to right, #45e87b, #45f3dc); */
`;

const UseIntercomChildPage = () => {
  const {
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
  } = useIntercom();

  const handleBoot = React.useCallback(() => boot({ name: 'Russo' }), [boot]);

  const handleUpdate = React.useCallback(() => {
    update({ name: 'ponas' });
  }, [update]);

  const handleNewMessages = React.useCallback(() => showNewMessages(), [
    showNewMessages,
  ]);

  const handleNewMessagesWithContent = React.useCallback(
    () => showNewMessages('pre-definded-content'),
    [showNewMessages],
  );

  const handleGetVisitorId = React.useCallback(() => {
    const id = getVisitorId();
    setVisitorId(id);
  }, [getVisitorId]);

  // TODO: check if example site is deployed
  const handleStartTour = React.useCallback(() => {
    startTour(9665679);
  }, [startTour]);

  const handleTrackEvent = React.useCallback(() => {
    trackEvent('invited-friend');
  }, [trackEvent]);

  const handleTrackEventWithMetaData = React.useCallback(() => {
    trackEvent('invited-friend', { name: 'Russo' });
  }, [trackEvent]);

  const [visitorId, setVisitorId] = React.useState<string | null>(null);

  return (
    <Grid>
      <Button data-cy="boot" onClick={boot}>
        Boot clean intercom
      </Button>
      <Button data-cy="boot-seeded" onClick={handleBoot}>
        Boot seeded intercom
      </Button>
      <Button data-cy="shutdown" onClick={shutdown}>
        Shutdown intercom
      </Button>
      <Button data-cy="shutdown-hard" onClick={hardShutdown}>
        Hard Shutdown intercom
      </Button>
      <Button data-cy="update" onClick={update}>
        Update clean session
      </Button>
      <Button data-cy="update-seeded" onClick={handleUpdate}>
        Update session with options
      </Button>
      <Button data-cy="show" onClick={show}>
        Show messages
      </Button>
      <Button data-cy="hide" onClick={hide}>
        Hide messages
      </Button>
      <Button data-cy="show-messages" onClick={showMessages}>
        Show messages list
      </Button>
      <Button data-cy="show-new-messages" onClick={handleNewMessages}>
        Show new messages
      </Button>
      <Button
        data-cy="show-messages-content"
        onClick={handleNewMessagesWithContent}
      >
        Show new messages with content
      </Button>
      <Button data-cy="visitorId" onClick={handleGetVisitorId}>
        Get visitor id
      </Button>
      <Button onClick={handleStartTour}>Start tour (wont work)</Button>
      <Button onClick={handleTrackEvent}>Track event</Button>
      <Button onClick={handleTrackEventWithMetaData}>
        Track event with metadata
      </Button>
      {visitorId && <p data-cy="visitorIdValue">{visitorId}</p>}
    </Grid>
  );
};

const UseIntercomPage = ({ children }: any) => {
  return (
    <IntercomProvider appId="jcabc7e3">
      <UseIntercomChildPage />
    </IntercomProvider>
  );
};

export default UseIntercomPage;
